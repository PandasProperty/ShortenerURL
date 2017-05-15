/**
 * Created by anda on 5/14/17.
 */

const onLogin = (error, data) => {
  if (error) {
    return {
      type: 'LOGIN_FAIL',
      payload: data
    }
  }
  localStorage.setItem("token", data.token);
  return {
    type: 'LOGIN_SUCCESS',
    payload: data.token
  }
};

const logout = () => {
  localStorage.removeItem("token");
  return {
    type: 'LOGOUT',
    payload: null
  }
};

const loadToken = () => {
  var token = localStorage.getItem("token");
  return {
    type: 'LOGIN_SUCCESS',
    payload: token
  }
};

module.exports = {
  onLogin: onLogin,
  logout: logout,
  loadToken: loadToken
};
