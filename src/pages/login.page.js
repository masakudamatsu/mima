import Head from 'next/head';

import {ButtonDialog} from 'src/elements/ButtonDialog';
import {ComposeLoginPage} from 'src/elements/ComposeLoginPage';
import {DivLoginPageBackground} from 'src/elements/DivLoginPageBackground';
import {FormLogin} from 'src/elements/FormLogin';
import {H1Logo} from 'src/elements/H1Logo';

import {NightModeContext} from 'src/wrappers/NightModeContext';
import {useNightMode} from 'src/hooks/useNightMode';

import {useStateObject} from 'src/hooks/useStateObject';

import {login} from 'src/utils/metadata';
import {loginPage} from 'src/utils/uiCopies';
export default function Login() {
  useNightMode(NightModeContext);
  const [user, setUser] = useStateObject({
    submitted: false,
    email: null,
  });
  const {submitted, email} = user;
  const handleSubmit = async event => {
    event.preventDefault();
    setUser({submitted: true, email: event.target.elements.email.value});
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
          {submitted === false ? (
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
            </FormLogin>
          ) : (
            <div
              aria-describedby="email-sent-body"
              aria-labelledby="email-sent"
              role="dialog"
            >
              <h2 id="email-sent">{loginPage.emailSentMessage.title(email)}</h2>
              <div id="email-sent-body">
                <p>{loginPage.emailSentMessage.paragraphOne}</p>
                <p>{loginPage.emailSentMessage.paragraphTwo}</p>
                <p>{loginPage.emailSentMessage.paragraphThree}</p>
              </div>
              <ButtonDialog
                onClick={() => setUser({submitted: false, email: null})}
                type="button"
              >
                {loginPage.tryAgainButtonLabel}
              </ButtonDialog>
            </div>
          )}{' '}
        </ComposeLoginPage>{' '}
      </DivLoginPageBackground>
    </>
  );
}
