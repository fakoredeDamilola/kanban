import Head from "next/head";
import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "../config/theme";
import "../styles/globals.css";
import { AppProps } from "next/app";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import store from "../state/store";
import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GoogleOAuthProvider } from "@react-oauth/google";

import SecondaryLayout from "../components/layout/SecondaryLayout";
import { lightColors } from "../config/colors/lightColors";
import { darkColors } from "../config/colors/darkColors";

type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType;
  };
};

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem("kanbanToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/api",
  // uri: "https://kanban-backend-p7m2.onrender.com/api",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function MyApp(props: ComponentWithPageLayout) {
  const [themes, setTheme] = useState<string>("light");

  const [mountedComponent, setMountedComponent] = useState(false);
  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme") ?? "dark";

    localTheme && setTheme(localTheme);
    setTheme(localTheme);

    setMountedComponent(true);
  }, []);

  const [token, setToken] = useState<string | null>("");
  useEffect(() => {
    const tokens = window.localStorage.getItem("token");
    setToken(tokens);
  }, [token]);

  const { Component, pageProps } = props;
  if (!mountedComponent) return <div />;
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <GoogleOAuthProvider clientId="731180830861-8qrnniga9ddfv8cturks1f7gjuiratvo.apps.googleusercontent.com">
        <ApolloProvider client={client}>
          <Provider store={store}>
            {/* // @ts-ignore */}
            <ThemeProvider theme={themes == "light" ? darkColors : lightColors}>
              <GlobalStyles />
              {Component?.PageLayout ? (
                <SecondaryLayout>
                  <Component {...pageProps} />
                </SecondaryLayout>
              ) : (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              )}

              {/* <LoadingPage /> */}
            </ThemeProvider>
          </Provider>
        </ApolloProvider>
      </GoogleOAuthProvider>
    </>
  );
}

MyApp.getInitialProps = async function ({
  Component,
  ctx,
}: {
  Component: any;
  ctx: any;
}) {
  let pageProps = {
    query: "",
  };
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};
export default MyApp;
