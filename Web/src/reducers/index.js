/**
 * Created by anda on 5/14/17.
 */

import {combineReducers} from 'redux';
import UserReducer from './reducer-users';
import UrlsReducer from './reducer-urls';
import ModalReducer from './reducer-modal';

const allReducers = combineReducers({
  user: UserReducer,
  urls: UrlsReducer,
  modal: ModalReducer
});

export default allReducers;
