'use strict';
import {
  ADD_SENTENCE,
  REMOVE_SENTENCE
} from '../actions/savedSentenceActions.js';

import {
  DELETE_IMAGE,
} from '../actions/imageActions.js'

const initialState = {
  byId: { },
  allIds: [],
  nextId: 0,
};

export default function savedSentences(state=initialState, action) {
  switch (action.type) {
    case ADD_SENTENCE: {
      const id = 'sentence' + state.nextId;
      return {
        byId: {
          ...state.byId,
          [id]: {
            image: action.image,
            text: action.text,
            recordingUri: action.recordingUri,
          }
        },
        allIds: state.allIds.concat([id]),
        nextId: state.nextId + 1,
      }
    }
    case REMOVE_SENTENCE: {
      const updatedById = { ...state.byId }
      delete updatedById[action.id]
      return {
        ...state,
        byId: updatedById,
        allIds: state.allIds.filter(id => id !== action.id),
      }
    }
    case DELETE_IMAGE: {
      const updatedById = { ...state.byId }
      let updatedAllIds = []
      for(let id of state.byId) {
        if(updatedById[id].image === actions.id) {
          delete updatedById[id]
        }
        else {
          updatedAllIds.push(id)
        }
      }
      return {
        ...state,
        byId: updatedById,
        allIds: updatedAllIds,
      }
    }
    default:
      return state
  }
}
