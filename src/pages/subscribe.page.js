import {useEffect, useState} from 'react';
import Head from 'next/head';
import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import {getAccessToken, getAppMetadata} from 'src/utils/callManagementApi';

import {ButtonDialog} from 'src/elements/ButtonDialog';
import {ComposeLoginPage} from 'src/elements/ComposeLoginPage';
import {DivLoginPageBackground} from 'src/elements/DivLoginPageBackground';
import {H1Logo} from 'src/elements/H1Logo';

import {NightModeContext} from 'src/wrappers/NightModeContext';
import {useNightMode} from 'src/hooks/useNightMode';

import {subscribe} from 'src/utils/metadata';
import {buttonLabel, subscribePage} from 'src/utils/uiCopies';

export default function Subscribe() {
  useNightMode(NightModeContext);
  const [ui, setUi] = useState('offer');
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      setUi('success');
    }
    if (query.get('canceled')) {
      setUi('canceled');
    }
  }, []);
  return (
    <>
      <Head>
        <title>{subscribe.title}</title>
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
            <H1Logo>{subscribePage.titleText}</H1Logo>
          </header>
          {ui === 'offer' ? (
            <form action="/api/checkout_sessions" method="POST">
              <h2>{subscribePage.offer.h2}</h2>
              <p>{subscribePage.offer.bodyText.subscribe}</p>
              <p>{subscribePage.offer.bodyText.logout}</p>
              <ButtonDialog data-button-purpose="signup" type="submit">
                {subscribePage.offer.buttonLabel}
              </ButtonDialog>
              <ButtonDialog
                as="a"
                data-reset-link-style="true"
                href="/api/auth/logout"
              >
                {buttonLabel.logout}
              </ButtonDialog>
            </form>
          ) : ui === 'success' ? (
            <main aria-labelledby="success">
              <h2 id="success">{subscribePage.success.h2}</h2>
              <p>{subscribePage.success.bodyText}</p>
              <ButtonDialog as="a" data-reset-link-style="true" href="/">
                {subscribePage.success.buttonLabel}
              </ButtonDialog>
            </main>
          ) : ui === 'canceled' ? (
            <form action="/api/checkout_sessions" method="POST">
              <h2>{subscribePage.canceled.h2}</h2>
              <p>{subscribePage.canceled.bodyText}</p>
              <ButtonDialog type="submit">
                {subscribePage.canceled.buttonLabel}
              </ButtonDialog>
            </form>
          ) : null}
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
    if (today > expirationDate) {
      return {props: {}};
    } else {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }, // API reference: https://nextjs.org/docs/api-reference/next.config.js/redirects
      }; // Docs: https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#redirect
    }
  },
});
