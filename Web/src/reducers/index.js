/**
 * Created by anda on 5/14/17.
 */

import {combineReducers} from 'redux';
import UserReducers from './reducer-users';

const allReducers = combineReducers({
  user: UserReducers
});

export default allReducers;
