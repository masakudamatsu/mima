import Head from 'next/head';

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
      <header>
        <H1Logo>My Ideal Map</H1Logo>
      </header>
      <form
        onSubmit={handleSubmit}
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <label htmlFor="email">{loginPage.fieldLabel}</label>
        <input
          id="email"
          name="email"
          placeholder={loginPage.fieldPlaceholder}
          type="email"
          style={{outline: '1px solid gray'}}
        />
        <button type="submit" style={{outline: '1px solid gray'}}>
          {loginPage.buttonLabel}
        </button>
      </form>
    </>
  );
}
