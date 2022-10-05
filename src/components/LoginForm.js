// import PropTypes from 'prop-types';
import {Magic} from 'magic-sdk';

import {ButtonDialog} from 'src/elements/ButtonDialog';
import {FormLogin} from 'src/elements/FormLogin';

import {useStateObject} from 'src/hooks/useStateObject';

import {loginPage} from 'src/utils/uiCopies';

export const LoginForm = () => {
  const [user, setUser] = useStateObject({
    submitted: false,
    email: null,
  });
  const {submitted, email} = user;
  const handleSubmit = async event => {
    event.preventDefault();
    const emailSubmitted = event.target.elements.email.value;
    setUser({submitted: true, email: emailSubmitted});
    // send Magic link via email to user
    await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY,
    ).auth.loginWithMagicLink({
      email: emailSubmitted,
      showUI: false, // disable the default UI after submission
    });
  };

  return submitted === false ? (
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
  );
};

// LoginForm.propTypes = {};
