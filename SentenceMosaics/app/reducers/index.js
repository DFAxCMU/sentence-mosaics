'use strict';

import { combineReducers } from 'redux';

import sentences from './sentences';
import images from './images';

const allReducers = combineReducers({
  sentences,
  images,
});

export default allReducers
