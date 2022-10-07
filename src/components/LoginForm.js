// import PropTypes from 'prop-types';
import {useRouter} from 'next/router';
import {Magic} from 'magic-sdk';

import {ButtonDialog} from 'src/elements/ButtonDialog';
import {FormLogin} from 'src/elements/FormLogin';

import {useStateObject} from 'src/hooks/useStateObject';

import {loginPage} from 'src/utils/uiCopies';

export const LoginForm = () => {
  const [user, setUser] = useStateObject({
    status: 'initial',
    email: null,
    error: null,
  });
  const {status, email} = user;

  const router = useRouter();

  const handleSubmit = async event => {
    event.preventDefault();
    const emailSubmitted = event.target.elements.email.value;
    setUser({status: 'submitted', email: emailSubmitted});
    // send Magic link via email to user
    // and, once the user clicks the Magic link,
    // receive `did` (decentralized identifier)
    const did = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY,
    ).auth.loginWithMagicLink({
      email: emailSubmitted,
      showUI: false, // disable the default UI after submission
    });
    // Once we have did, request for session token
    const authRequest = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${did}`,
      },
    });
    if (authRequest.ok) {
      router.push('/');
    } else {
      console.error('Authentication fails');
    }
  };

  if (status === 'initial') {
    return (
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
    );
  } else if (status === 'submitted') {
    return (
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
          onClick={() => setUser({status: 'initial', email: null})}
          type="button"
        >
          {loginPage.tryAgainButtonLabel}
        </ButtonDialog>
      </div>
    );
  }
};

// LoginForm.propTypes = {};
