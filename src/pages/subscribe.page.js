import Head from 'next/head';

import {ButtonDialog} from 'src/elements/ButtonDialog';
import {ComposeLoginPage} from 'src/elements/ComposeLoginPage';
import {DivLoginPageBackground} from 'src/elements/DivLoginPageBackground';
import {H1Logo} from 'src/elements/H1Logo';

import {NightModeContext} from 'src/wrappers/NightModeContext';
import {useNightMode} from 'src/hooks/useNightMode';

import {subscribe} from 'src/utils/metadata';
import {subscribePage} from 'src/utils/uiCopies';

export default function Login() {
  useNightMode(NightModeContext);
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
          <ButtonDialog as="a" data-reset-link-style="true" href="">
            {subscribePage.buttonLabel}
          </ButtonDialog>
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
