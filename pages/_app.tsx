import Head from 'next/head';
import { ThemeProvider } from "styled-components"

import { darkTheme,GlobalStyles,lightTheme } from '../config/theme';
import "../styles/globals.css"
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { useDarkMode } from '../hooks/useDarkMode';
import { Provider} from 'react-redux';
import store from '../state/store';
import Toggle from '../components/Toggle';
import { useEffect, useState } from 'react';
import { switchTheme } from '../state/display';




export default function MyApp(props:AppProps) {

  // This function is triggered when the Switch component is toggled
  // const [theme,themeToggler, mountedComponent] = useDarkMode();
  const [theme, setTheme] = useState<string>('light');
  const [mountedComponent, setMountedComponent] = useState(false)

  const setMode =( mode:string) => {
      window.localStorage.setItem('theme', mode)
      console.log({mode})
      setTheme(mode)
  };

  const themeToggler = () => {
      theme === 'light' ? setMode('dark') : setMode('light')
  };

  useEffect(() => {
      const localTheme = window.localStorage.getItem('theme');
      console.log({localTheme})
      localTheme && setTheme(localTheme)
      setMountedComponent(true)
  }, []);



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
      <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme} >
        <>
        <GlobalStyles />
        <Layout>
           <Component {...pageProps} />
        </Layout>
        </>
       
       
        <Toggle toggleTheme={themeToggler} theme={theme} />
      </ThemeProvider>
      </Provider>
    </>
  );
}