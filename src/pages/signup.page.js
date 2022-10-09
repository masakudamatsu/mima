import Head from 'next/head';

import {LoginForm} from 'src/components/LoginForm';

import {ComposeLoginPage} from 'src/elements/ComposeLoginPage';
import {DivLoginPageBackground} from 'src/elements/DivLoginPageBackground';
import {H1Logo} from 'src/elements/H1Logo';

import {NightModeContext} from 'src/wrappers/NightModeContext';
import {useNightMode} from 'src/hooks/useNightMode';

import {signup} from 'src/utils/metadata';
import {signupPage} from 'src/utils/uiCopies';

const {decryptToken} = require('src/utils/iron');

export default function Login() {
  useNightMode(NightModeContext);
  return (
    <>
      <Head>
        <title>{signup.title}</title>
        {/* TODO #111: remove below after locally hosting Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Slab:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <DivLoginPageBackground>
        <ComposeLoginPage>
          <header>
            <H1Logo>{signupPage.titleText}</H1Logo>
          </header>
          <LoginForm page={signupPage} />
        </ComposeLoginPage>{' '}
      </DivLoginPageBackground>
    </>
  );
}

export async function getServerSideProps({req}) {
  // API reference: https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter
  try {
    await decryptToken(req.cookies['api_token']);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }, // API reference: https://nextjs.org/docs/api-reference/next.config.js/redirects
    }; // Docs: https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#redirect
  } catch (error) {
    return {
      props: {},
    };
  }
}
