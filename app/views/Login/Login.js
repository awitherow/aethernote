import React, { PropTypes } from 'react';

function Login() {
  return (
    <p>Login screen</p>
  );
}

Login.propTypes = {
  test: PropTypes.string.isRequired,
};

export default Login;
