import PropTypes from 'prop-types';
import {useRouter} from 'next/router';
import {Magic} from 'magic-sdk';

import {ButtonDialog} from 'src/elements/ButtonDialog';
import {FormLogin} from 'src/elements/FormLogin';

import {useStateObject} from 'src/hooks/useStateObject';
import {loginPage} from 'src/utils/uiCopies';
export const LoginForm = ({page}) => {
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
      setUser({status: 'error'});
    }
  };

  if (status === 'initial') {
    return (
      <FormLogin onSubmit={handleSubmit}>
        <label htmlFor="email">{page.fieldLabel}</label>
        <input
          id="email"
          name="email"
          placeholder={page.fieldPlaceholder}
          required
          type="email"
        />
        <ButtonDialog type="submit">{page.buttonLabel}</ButtonDialog>
      </FormLogin>
    );
  } else if (status === 'submitted') {
    return (
      <div
        aria-describedby="email-sent-body"
        aria-labelledby="email-sent"
        role="dialog"
      >
        <h2 id="email-sent">{page.emailSentMessage.title(email)}</h2>
        <div id="email-sent-body">
          <p>{page.emailSentMessage.paragraphOne}</p>
          <p>{page.emailSentMessage.paragraphTwo}</p>
          <p>{page.emailSentMessage.paragraphThree}</p>
        </div>
        {page === loginPage ? (
          <ButtonDialog
            onClick={() => setUser({status: 'initial', email: null})}
            type="button"
          >
            {page.tryAgainButtonLabel}
          </ButtonDialog>
        ) : null}
      </div>
    );
  } else if (status === 'error') {
    return (
      <div
        aria-describedby="login-failure-body"
        aria-labelledby="login-failure"
        role="alertdialog"
      >
        <h2 id="login-failure">{page.loginFailureMessage.title}</h2>
        <div id="longin-failure-body">
          <p>{page.loginFailureMessage.paragraphOne}</p>
          <p>{page.loginFailureMessage.paragraphTwo}</p>
        </div>
        <div>
          <ButtonDialog
            onClick={() => setUser({status: 'initial', email: null})}
            type="button"
          >
            {page.tryAgainButtonLabel}
          </ButtonDialog>
          <ButtonDialog onClick={() => {}} type="button">
            {page.contactSupportButtonLabel}
          </ButtonDialog>
        </div>
      </div>
    );
  }
};

LoginForm.propTypes = {
  page: PropTypes.object,
};
