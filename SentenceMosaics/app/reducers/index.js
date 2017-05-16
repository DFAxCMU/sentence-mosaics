'use strict';

import { combineReducers } from 'redux';

import routes from './routes';
import sentences from './sentences';
import images from './images';

const allReducers = combineReducers({
  routes,
  sentences,
  images,
});

export default allReducers