import Head from 'next/head';
import { ThemeProvider } from "styled-components"

import { GlobalStyles } from '../config/theme';
import "../styles/globals.css"
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { Provider} from 'react-redux';
import store from '../state/store';
import React, { useEffect, useState } from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";


type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType;
  };
};

const authLink = setContext((_,{headers})=> {
  const token = window.localStorage.getItem("token")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
  }
  }
})

const httpLink = createHttpLink({
  uri: "http://localhost:4000/api"
})


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache:new InMemoryCache()
})

function MyApp(props:ComponentWithPageLayout) {




  const { Component, pageProps, } = props;
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={client}>
        <Provider store={store}>
      {/* // @ts-ignore */}
        <>
        <GlobalStyles />
        {Component?.PageLayout ? (
        
        // <Component.PageLayout>
          <Component {...pageProps} />
        // </Component.PageLayout>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
        
      )}
        
        </>
       
       
       
      </Provider>
      </ApolloProvider>
      
    </>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }:{Component:any,ctx:any}) {
  let pageProps = {
    query:""
  };
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};
export default MyApp