import {useEffect, useState} from 'react';
import Head from 'next/head';

import {ButtonDialog} from 'src/elements/ButtonDialog';
import {ComposeLoginPage} from 'src/elements/ComposeLoginPage';
import {DivLoginPageBackground} from 'src/elements/DivLoginPageBackground';
import {H1Logo} from 'src/elements/H1Logo';

import {NightModeContext} from 'src/wrappers/NightModeContext';
import {useNightMode} from 'src/hooks/useNightMode';

import {subscribe} from 'src/utils/metadata';
import {subscribePage} from 'src/utils/uiCopies';

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
              <p>{subscribePage.offer.bodyText}</p>
              <ButtonDialog type="submit">
                {subscribePage.offer.buttonLabel}
              </ButtonDialog>
            </form>
          ) : ui === 'success' ? (
            <section aria-labelledby="success">
              <h2 id="success">{subscribePage.success.h2}</h2>
              <p>{subscribePage.success.bodyText}</p>
              <ButtonDialog as="a" data-reset-link-style="true" href="/">
                {subscribePage.success.buttonLabel}
              </ButtonDialog>
            </section>
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

export async function getServerSideProps({req}) {
  // API reference: https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter
  return {
    props: {},
  };
}
