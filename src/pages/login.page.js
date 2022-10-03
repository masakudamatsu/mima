import Head from 'next/head';

import {login} from 'src/utils/metadata';
import {loginPage} from 'src/utils/uiCopies';
export default function Login() {
  const handleSubmit = async event => {
    event.preventDefault();
  };
  return (
    <>
      <Head>
        <title>{login.title}</title>
      </Head>
      <header>
        <h1>{loginPage.titleText}</h1>
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
