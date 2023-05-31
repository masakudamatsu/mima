import Head from 'next/head';

import {Logo} from 'src/components/Logo';

import {ButtonDialog} from 'src/elements/ButtonDialog';
import {ComposeLoginPage} from 'src/elements/ComposeLoginPage';
import {DivLoginPageBackground} from 'src/elements/DivLoginPageBackground';

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
      </Head>
      <DivLoginPageBackground>
        <ComposeLoginPage>
          <header>
            <Logo />
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
