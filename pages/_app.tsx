import Head from 'next/head';
import { ThemeProvider } from "styled-components"

import { darkTheme,GlobalStyles,lightTheme } from '../config/theme';
import "../styles/globals.css"
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { useDarkMode } from '../hooks/useDarkMode';
import { Provider } from 'react-redux';
import store from '../state/store';




export default function MyApp(props:AppProps) {

  // This function is triggered when the Switch component is toggled
  const [theme, mountedComponent] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;



  const { Component, pageProps } = props;
  if(!mountedComponent) return <div/>
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
      {/* 
// @ts-ignore */}
      <ThemeProvider theme={themeMode} >
        <>
        <GlobalStyles />
        <Layout>
           <Component {...pageProps} />
        </Layout>
        </>
       
       
       
      </ThemeProvider>
      </Provider>
    </>
  );
}