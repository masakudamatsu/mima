import Head from 'next/head';

import {getServerSidePropsWrapper, getSession} from '@auth0/nextjs-auth0';

import {Logo} from 'src/components/Logo';

import {ButtonDialog} from 'src/elements/ButtonDialog';
import {ComposeLoginPage} from 'src/elements/ComposeLoginPage';
import {DivLoginPageBackground} from 'src/elements/DivLoginPageBackground';
import {VisuallyHidden} from 'src/elements/VisuallyHidden';

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
      </Head>
      <DivLoginPageBackground>
        <ComposeLoginPage>
          <header>
            <VisuallyHidden as="h1">{login.title}</VisuallyHidden>
            <Logo />
          </header>
          <main>
            <ButtonDialog
              as="a"
              data-reset-link-style="true"
              href="/api/auth/login"
            >
              {loginPage.buttonLabel}
            </ButtonDialog>
          </main>
        </ComposeLoginPage>{' '}
      </DivLoginPageBackground>
    </>
  );
}

export const getServerSideProps = getServerSidePropsWrapper(
  // API reference: https://auth0.github.io/nextjs-auth0/modules/helpers_get_server_side_props_wrapper.html#getserversidepropswrapper
  async ({req, res}) => {
    // API reference: https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter

    // check if the user is authorised
    const session = getSession(req, res);
    if (session) {
      // TODO #346: Check session.accessTokenExpiresAt instead
      // If authorised, redirect to the app
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }, // API reference: https://nextjs.org/docs/api-reference/next.config.js/redirects
      }; // Docs: https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#redirect
    } else {
      // Otherwise, show the login button
      return {
        props: {},
      };
    }
  },
);
