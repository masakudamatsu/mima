import Head from 'next/head';

import GlobalStyle from 'src/utils/GlobalStyle';
import {NightModeProvider} from 'src/context/NightModeContext';

export default function App({Component, pageProps}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* This tag would cause an error if it were in _document.js. See https://github.com/vercel/next.js/blob/master/errors/no-document-viewport-meta.md */}
      </Head>
      <GlobalStyle />
      <NightModeProvider>
        <Component {...pageProps} />{' '}
      </NightModeProvider>
    </>
  );
}
