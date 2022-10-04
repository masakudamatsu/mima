import Head from 'next/head';

import {LoginForm} from 'src/components/LoginForm';

import {ComposeLoginPage} from 'src/elements/ComposeLoginPage';
import {DivLoginPageBackground} from 'src/elements/DivLoginPageBackground';
import {H1Logo} from 'src/elements/H1Logo';

import {NightModeContext} from 'src/wrappers/NightModeContext';
import {useNightMode} from 'src/hooks/useNightMode';

import {login} from 'src/utils/metadata';

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
            <H1Logo>My Ideal Map</H1Logo>
          </header>
          <LoginForm />
        </ComposeLoginPage>{' '}
      </DivLoginPageBackground>
    </>
  );
}
