/**
 * Created by anda on 5/23/17.
 */

export default function (state={show:false}, action) {
  switch (action.type) {
    case 'SHOW_MODAL':
      return action.payload;
    case 'HIDE_MODAL':
      return action.payload;
  }
  return state;
}
