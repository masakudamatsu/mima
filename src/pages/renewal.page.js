import Head from 'next/head';
import {withPageAuthRequired} from '@auth0/nextjs-auth0';

import {Logo} from 'src/components/Logo';

import {ButtonDialog} from 'src/elements/ButtonDialog';
import {ComposeLoginPage} from 'src/elements/ComposeLoginPage';
import {DivLoginPageBackground} from 'src/elements/DivLoginPageBackground';

import {NightModeContext} from 'src/wrappers/NightModeContext';
import {useNightMode} from 'src/hooks/useNightMode';

import {renewal} from 'src/utils/metadata';
import {buttonLabel, renewalPage} from 'src/utils/uiCopies';

export default function Renewal() {
  useNightMode(NightModeContext);
  return (
    <>
      <Head>
        <title>{renewal.title}</title>
      </Head>
      <DivLoginPageBackground>
        <ComposeLoginPage>
          <header>
            <Logo />
          </header>
          <main>
            {/* TODO #350: customize UI text for users who have clicked the email notice to update payment information */}
            <h2>{renewalPage.offer.h2}</h2>
            <p>{renewalPage.offer.bodyText.renew}</p>
            <p>{renewalPage.offer.bodyText.logout}</p>
            <ButtonDialog
              as="a"
              data-button-purpose="signup"
              data-reset-link-style="true"
              href={process.env.NEXT_PUBLIC_CUSTOMER_PORTAL_URL}
            >
              {renewalPage.offer.buttonLabel}
            </ButtonDialog>
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

export const getServerSideProps = withPageAuthRequired();
