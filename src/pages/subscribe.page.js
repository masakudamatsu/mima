import {useEffect, useState} from 'react';
import Head from 'next/head';
import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import {getAccessToken, getAppMetadata} from 'src/utils/callManagementApi';
import {statusType} from 'src/utils/type';

import {Logo} from 'src/components/Logo';

import {ButtonDialog} from 'src/elements/ButtonDialog';
import {ComposeLoginPage} from 'src/elements/ComposeLoginPage';
import {DivLoginPageBackground} from 'src/elements/DivLoginPageBackground';

import {NightModeContext} from 'src/wrappers/NightModeContext';
import {useNightMode} from 'src/hooks/useNightMode';

import {subscribe} from 'src/utils/metadata';
import {buttonLabel, subscribePage} from 'src/utils/uiCopies';

export default function Subscribe({status}) {
  useNightMode(NightModeContext);
  const [ui, setUi] = useState(
    status === statusType.unpaid
      ? 'unpaid'
      : status === statusType.cancelled
      ? 'reoffer'
      : 'offer',
  );
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('canceled')) {
      setUi('canceled');
    }
  }, []);
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
          ) : ui === 'unpaid' ? (
            <form action="/api/checkout_sessions" method="POST">
              <h2>{subscribePage.unpaid.h2}</h2>
              <p>{subscribePage.unpaid.bodyText.subscribe}</p>
              <p>{subscribePage.unpaid.bodyText.data}</p>
              <p>{subscribePage.unpaid.bodyText.logout}</p>
              <ButtonDialog data-button-purpose="signup" type="submit">
                {subscribePage.unpaid.buttonLabel}
              </ButtonDialog>
              <ButtonDialog
                as="a"
                data-reset-link-style="true"
                href="/api/auth/logout"
              >
                {buttonLabel.logout}
              </ButtonDialog>
            </form>
          ) : ui === 'canceled' ? (
            <form action="/api/checkout_sessions" method="POST">
              <h2>{subscribePage.canceled.h2}</h2>
              <p>{subscribePage.canceled.bodyText.subscribe}</p>
              <p>{subscribePage.canceled.bodyText.logout}</p>
              <ButtonDialog data-button-purpose="signup" type="submit">
                {subscribePage.canceled.buttonLabel}
              </ButtonDialog>
              <ButtonDialog
                as="a"
                data-reset-link-style="true"
                href="/api/auth/logout"
              >
                {buttonLabel.logout}
              </ButtonDialog>
            </form>
          ) : ui === 'reoffer' ? (
            <form action="/api/checkout_sessions" method="POST">
              <h2>{subscribePage.reoffer.h2}</h2>
              <p>{subscribePage.reoffer.bodyText.subscribe}</p>
              <p>{subscribePage.reoffer.bodyText.logout}</p>
              <ButtonDialog data-button-purpose="signup" type="submit">
                {subscribePage.reoffer.buttonLabel}
              </ButtonDialog>
              <ButtonDialog
                as="a"
                data-reset-link-style="true"
                href="/api/auth/logout"
              >
                {buttonLabel.logout}
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
      return {
        props: {
          status: app_metadata['status'],
        },
      };
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
