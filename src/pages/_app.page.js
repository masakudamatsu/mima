import Head from 'next/head';
import {UserProvider} from '@auth0/nextjs-auth0';

import {GlobalStyle} from 'src/elements/GlobalStyle';
import {NightModeProvider} from 'src/wrappers/NightModeContext';

export default function App({Component, pageProps}) {
  const {user} = pageProps;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* This tag would cause an error if it were in _document.js. See https://github.com/vercel/next.js/blob/master/errors/no-document-viewport-meta.md */}
      </Head>
      <GlobalStyle />
      <NightModeProvider>
        <UserProvider user={user}>
          <Component {...pageProps} />{' '}
        </UserProvider>
      </NightModeProvider>
    </>
  );
}
