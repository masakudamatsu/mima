import Head from 'next/head';
import {getSession} from '@auth0/nextjs-auth0';
import {ButtonDialog} from 'src/elements/ButtonDialog';
import {ComposeLoginPage} from 'src/elements/ComposeLoginPage';
import {DivLoginPageBackground} from 'src/elements/DivLoginPageBackground';
import {H1Logo} from 'src/elements/H1Logo';

import {NightModeContext} from 'src/wrappers/NightModeContext';
import {useNightMode} from 'src/hooks/useNightMode';

import {login} from 'src/utils/metadata';
import {loginPage} from 'src/utils/uiCopies';

export default function Login() {
  useNightMode(NightModeContext);
  return (
    <>
      <Head>
        <title>{login.title}</title>
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
            <H1Logo>{loginPage.titleText}</H1Logo>
          </header>
          <ButtonDialog
            as="a"
            data-reset-link-style="true"
            href="/api/auth/login"
          >
            {loginPage.buttonLabel}
          </ButtonDialog>
        </ComposeLoginPage>{' '}
      </DivLoginPageBackground>
    </>
  );
}

export async function getServerSideProps({req, res}) {
  // API reference: https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter

  // redirect authorised users to the app
  const {user} = getSession(req, res);
  if (user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }, // API reference: https://nextjs.org/docs/api-reference/next.config.js/redirects
    }; // Docs: https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#redirect
  }
  // otherwise, show the login button
  return {
    props: {},
  };
}
