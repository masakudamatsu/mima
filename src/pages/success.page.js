import Head from 'next/head';
import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import {getAccessToken, getAppMetadata} from 'src/utils/callManagementApi';

import {Logo} from 'src/components/Logo';

import {ButtonDialog} from 'src/elements/ButtonDialog';
import {ComposeLoginPage} from 'src/elements/ComposeLoginPage';
import {DivLoginPageBackground} from 'src/elements/DivLoginPageBackground';

import {NightModeContext} from 'src/wrappers/NightModeContext';
import {useNightMode} from 'src/hooks/useNightMode';

import {subscribe} from 'src/utils/metadata';
import {subscribePage} from 'src/utils/uiCopies';

export default function Success() {
  useNightMode(NightModeContext);
  return (
    <>
      <Head>
        <title>{subscribe.title}</title>
      </Head>
      <DivLoginPageBackground>
        <ComposeLoginPage>
          <header>
            <Logo />
          </header>
          <main aria-labelledby="success">
            <h2 id="success">{subscribePage.success.h2}</h2>
            <p>{subscribePage.success.bodyText}</p>
            <ButtonDialog as="a" data-reset-link-style="true" href="/">
              {subscribePage.success.buttonLabel}
            </ButtonDialog>
          </main>
        </ComposeLoginPage>{' '}
      </DivLoginPageBackground>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({req, res}) {
    // Retrieve the subscription expiration date
    const {user} = getSession(req, res);
    const accessToken = await getAccessToken();
    const {app_metadata} = await getAppMetadata({
      accessToken,
      userId: user.sub,
    });
    // Check if subscription period expires
    const today = new Date();
    const expirationDate = new Date(app_metadata['expiration_date']);
    if (today < expirationDate) {
      return {props: {}};
    } else {
      return {
        redirect: {
          destination: '/subscribe',
          permanent: false,
        }, // API reference: https://nextjs.org/docs/api-reference/next.config.js/redirects
      }; // Docs: https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#redirect
    }
  },
});
