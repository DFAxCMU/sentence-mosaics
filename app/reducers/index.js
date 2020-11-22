'use strict';

import { combineReducers } from 'redux';

import currentSentence from './currentSentence.js';
import images from './images.js';

const allReducers = combineReducers({
  currentSentence,
  images,
});

export default allReducers
