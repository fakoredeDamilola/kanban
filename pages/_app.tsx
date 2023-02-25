import Head from 'next/head';
import { ThemeProvider } from "styled-components"

import { GlobalStyles } from '../config/theme';
import "../styles/globals.css"
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { Provider} from 'react-redux';
import store from '../state/store';
import React, { useEffect, useState } from 'react';



type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType;
  };
};
export default function MyApp(props:ComponentWithPageLayout) {




  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
      {/* // @ts-ignore */}
        <>
        <GlobalStyles />
        {Component.PageLayout ? (
        <Component.PageLayout>
          <Component {...pageProps} />
        </Component.PageLayout>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
        
      )}
        
        </>
       
       
       
      </Provider>
    </>
  );
}