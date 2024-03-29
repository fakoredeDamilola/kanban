import Document, {Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
    //--------------For styled-components only------------//
      static async getInitialProps(ctx:any) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage
    
        try {
          ctx.renderPage = () =>
            originalRenderPage({
              enhanceApp: (App:any) => (props:any) =>
                sheet.collectStyles(<App {...props} />),
            })
    
          const initialProps = await Document.getInitialProps(ctx)
          return {
            ...initialProps,
            styles: (
              <>
                {initialProps.styles}
                {sheet.getStyleElement()}
              </>
            ),
          }
        } finally {
        //   sheet.seal()
        }
      }
    //---------------------------------------------------//
      render() {
        return (
            <Html lang="en">
            <Head>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
              <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;500;700;800&display=swap" rel="stylesheet" />          
            </Head>
                <body>
                  
                    <Main />
                    <div id="portal"></div>
                    <div id="portal2"></div>
                    <NextScript />
                </body>
            </Html>
        );
    }
    }