import Head from 'next/head';

import {ButtonDialog} from 'src/elements/ButtonDialog';
import {ComposeLoginPage} from 'src/elements/ComposeLoginPage';
import {DivLoginPageBackground} from 'src/elements/DivLoginPageBackground';
import {FormLogin} from 'src/elements/FormLogin';
import {H1Logo} from 'src/elements/H1Logo';

import {NightModeContext} from 'src/wrappers/NightModeContext';
import {useNightMode} from 'src/hooks/useNightMode';

import {login} from 'src/utils/metadata';
import {loginPage} from 'src/utils/uiCopies';
export default function Login() {
  useNightMode(NightModeContext);
  const handleSubmit = async event => {
    event.preventDefault();
  };
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
          <FormLogin onSubmit={handleSubmit}>
            <label htmlFor="email">{loginPage.fieldLabel}</label>
            <input
              id="email"
              name="email"
              placeholder={loginPage.fieldPlaceholder}
              required
              type="email"
            />
            <ButtonDialog type="submit">{loginPage.buttonLabel}</ButtonDialog>
          </FormLogin>{' '}
        </ComposeLoginPage>{' '}
      </DivLoginPageBackground>
    </>
  );
}
