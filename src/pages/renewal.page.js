import Head from 'next/head';
import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';

import {ButtonDialog} from 'src/elements/ButtonDialog';
import {ComposeLoginPage} from 'src/elements/ComposeLoginPage';
import {DivLoginPageBackground} from 'src/elements/DivLoginPageBackground';
import {H1Logo} from 'src/elements/H1Logo';

import {NightModeContext} from 'src/wrappers/NightModeContext';
import {useNightMode} from 'src/hooks/useNightMode';

import {renewal} from 'src/utils/metadata';
import {buttonLabel, renewalPage} from 'src/utils/uiCopies';

export default function Renewal({email}) {
  useNightMode(NightModeContext);
  return (
    <>
      <Head>
        <title>{renewal.title}</title>
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
            <H1Logo>{renewalPage.titleText}</H1Logo>
          </header>
          <main>
            <h2>{renewalPage.offer.h2}</h2>
            <p>{renewalPage.offer.bodyText.renew(email)}</p>
            <p>{renewalPage.offer.bodyText.logout}</p>
            <ButtonDialog
              as="a"
              data-reset-link-style="true"
              href="/api/auth/logout"
            >
              {buttonLabel.logout}
            </ButtonDialog>
          </main>
        </ComposeLoginPage>{' '}
      </DivLoginPageBackground>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({req, res}) {
    // retrieve user's email address
    const {user} = getSession(req, res);
    return {
      props: {
        email: user.email,
      },
    };
  },
});
