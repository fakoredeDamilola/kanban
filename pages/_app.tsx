import {useEffect,useState} from 'react';
import Head from 'next/head';
import { Box, CardHeader, Container, Typography,FormControlLabel,Switch,CardContent,FormGroup,Card } from '@material-ui/core'
import { createTheme, ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { dark,light } from '../config/theme';
import createEmotionCache from '../config/createEmotionCache';

import { AppProps } from 'next/app';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();


export default function MyApp(props:AppProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // This function is triggered when the Switch component is toggled
  const changeTheme = () => {
    localStorage.setItem('theme', isDarkTheme ? 'light' : 'dark');
    setIsDarkTheme(!isDarkTheme);
  };
 useEffect(()=>{
  console.log("isDarkTheme",isDarkTheme)
  const theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
  if (theme === 'dark') {
    setIsDarkTheme(true);
  } else {
    setIsDarkTheme(false);
  }
 },[])


  const { Component, pageProps } = props;

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
        <Container>
        <div className="App">
          <Box component="div" p={5}></Box>
          <Card >
            <CardHeader
              action={
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch checked={isDarkTheme} onChange={changeTheme} />
                    }
                    label="Dark Theme"
                  />
                </FormGroup>
              }
            />
            <CardContent>
              <Typography variant="h3" component="h3">
                Kindacode.com
              </Typography>
              <Typography variant="body1">
                Dark Mode is {isDarkTheme ? "On" : "Off"}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Container>
      </ThemeProvider>
    </CacheProvider>
  );
}