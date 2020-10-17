'use strict';

import { combineReducers } from 'redux';

import sentences from './sentences';
import images from './images';
import savedSentences from './savedSentences';

const allReducers = combineReducers({
  sentences,
  images,
  savedSentences,
});

export default allReducers
