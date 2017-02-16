'use strict';

import { ActionConst } from 'react-native-router-flux';

const initialState = {
  activeSentence: [],
  activeURI: '',
  editIndex: 0,
  inputWord: '',
  modalType: null,
  wordPicker: null,
};

export default function sentences(state = initialState, action) {
  switch (action.type) {
    case 'ADD_WORD':
      return {
        ...state,
        activeSentence: state.activeSentence.concat([{word: action.word, type: action.wordType}])
      }
    case 'CLICK_WORD':
      return {
        ...state,
        wordPicker: action.wordType,
        editIndex: action.wordIndex
      }
    case 'EDIT_WORD':
      var updatedSentence = [
        ...state.activeSentence.slice(0, action.wordIndex),
        {word: action.word, type: state.wordPicker},
        ...state.activeSentence.slice(action.wordIndex + 1)
      ];
      return {
        ...state,
        wordPicker: null,
        activeSentence: updatedSentence
      }
    case 'INPUT_WORD':
      return {
        ...state,
        inputWord: action.word
      }
    case 'SELECT_PHOTO':
      return {
        ...state,
        activeURI: action.uri
      }
    case 'SET_MODAL':
      return {
        ...state,
        modalType: action.modalType
      }
    default:
      return state
  }
}