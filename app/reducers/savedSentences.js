'use strict';

const initialState = {
  sentence_list: [],
  sentence_count: 0
};

import {persistStore} from 'redux-persist'
import * as Actions from '../actions/index';

export default function savedSentences(state=initialState, action) {
console.log("saved sentences reducer: ", state)
  switch (action.type) {
    case Actions.ADD_SENTENCE:
        console.log("add sentence", action, action.image_index);
        return ({
          ...state,
          sentence_list: state.sentence_list.concat([{
	    image_id: action.image_index,
	    text: action.sentence,
	    // recording: action.recording_url
	    id: state.sentence_count
	  }]),
	  sentence_count: state.sentence_count + 1
        });
    case Actions.REMOVE_SENTENCE:
        var sentence_id = action.sentence_id;
	var new_list = state.sentence_list
	var sentence_index = -1
        for (var i=0; i < state.sentence_list.length; i++) {
	  if (state.sentence_list[i].id === action.sentence_id) {
	    sentence_index = i;
	    break;
	  }
	}
	if (sentence_index === -1) {
	  console.log("sentence id does not exist")
	} else {
	  console.log(sentence_index)
	  new_list = state.sentence_list.slice()
	  new_list.splice(sentence_index, 1)
	}
        return ({
          ...state,
	  sentence_list: new_list
        });
    case Actions.DELETE_IMAGE:
        return ({
	  ...state,
	  sentence_list: state.sentence_list.filter(function(a) {
	    return (a.image_id !== action.image_index)
	  })
	});
    default:
        return state
  }
}
