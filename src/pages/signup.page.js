import Head from 'next/head';

import {ButtonDialog} from 'src/elements/ButtonDialog';
import {ComposeLoginPage} from 'src/elements/ComposeLoginPage';
import {DivLoginPageBackground} from 'src/elements/DivLoginPageBackground';
import {H1Logo} from 'src/elements/H1Logo';

import {NightModeContext} from 'src/wrappers/NightModeContext';
import {useNightMode} from 'src/hooks/useNightMode';

import {signup} from 'src/utils/metadata';
import {loginPage, signupPage} from 'src/utils/uiCopies';

export default function Signup() {
  useNightMode(NightModeContext);
  return (
    <>
      <Head>
        <title>{signup.title}</title>
        <meta name="description" content={signup.description} />
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
          <main>
            <ButtonDialog
              as="a"
              data-button-purpose="signup"
              data-reset-link-style="true"
              href="/api/auth/signup"
            >
              {signupPage.buttonLabel}
            </ButtonDialog>
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
