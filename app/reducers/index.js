'use strict';

import { combineReducers } from 'redux';

import currentSentence from './currentSentence.js';
import images from './images';
import savedSentences from './savedSentences';

const allReducers = combineReducers({
  currentSentence,
  images,
  savedSentences,
});

export default allReducers
