import Head from 'next/head';

import GlobalStyle from 'src/elements/GlobalStyle';
import {NightModeProvider} from 'src/context/NightModeContext';

export default function App({Component, pageProps}) {
  return (
    <>
      <Head>
        {/* This tag would cause an error if it were in _document.js. See https://github.com/vercel/next.js/blob/master/errors/no-document-viewport-meta.md */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Maps server */}
        <link rel="preconnect" href="https://maps.googleapis.com" />{' '}
      </Head>
      <GlobalStyle />
      <NightModeProvider>
        <Component {...pageProps} />{' '}
      </NightModeProvider>
    </>
  );
}
