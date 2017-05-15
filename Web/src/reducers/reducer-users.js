/**
 * Created by anda on 5/14/17.
 */

export default function (state=null, action) {
  switch (action.type) {
    case 'LOGIN_FAIL':
      return action.payload;
    case 'LOGIN_SUCCESS':
      return action.payload;
    case 'LOGOUT':
      return action.payload;
  }
  return state;
}
