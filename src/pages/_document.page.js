// Based on https://github.com/vercel/next.js/blob/canary/examples/with-styled-components/pages/_document.js (1 Sep, 2020) (for using styled-components)

import Document, {Html, Head, Main, NextScript} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        {' '}
        {/* If a page doesn't specify a lang attribute, a screen reader assumes that the page is in the default language that the user chose when setting up the screen reader https://web.dev/html-has-lang/ */}
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+Display:wght@700&display=swap"
            rel="stylesheet"
          />{' '}
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" sizes="48x48" />
          <link
            rel="icon"
            href="/favicon.svg"
            sizes="any"
            type="image/svg+xml"
          />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>{' '}
        <body>
          <Main />
          {/* Here we will mount our modal portal */}
          <div id="modal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
