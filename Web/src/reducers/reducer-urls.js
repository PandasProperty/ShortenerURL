/**
 * Created by anda on 5/23/17.
 */

export default function (state=null, action) {
  switch (action.type) {
    case 'URL_FAIL':
      return action.payload;
    case 'URL_SUCCESS':
      return action.payload;
  }
  return state;
}
