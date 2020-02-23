import { combineReducers } from 'redux';

import configuration from './configuration';
import mines from './mines';

const rootReducer = combineReducers({
  configuration,
  mines
});

export default rootReducer;
