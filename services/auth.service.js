exports.register = async (data) => {
  return {
    message: 'Register success',
    user: data
  };
};

exports.login = async (data) => {
  return {
    message: 'Login success',
    token: 'fake-jwt-token'
  };
};
