'use strict';

import { combineReducers } from 'redux';

import routes from './routes';
import sentences from './sentences';

const allReducers = combineReducers({
  routes,
  sentences
});

export default allReducers