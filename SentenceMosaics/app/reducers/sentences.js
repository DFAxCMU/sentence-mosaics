'use strict';

import { ActionConst } from 'react-native-router-flux';
import { words } from '../words';

const initialState = {
  activeSentence: [{word: '', type: 'pronoun'}, {word: '', type: 'main verb'}, {word: '', type: 'noun'}],
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
    case 'CLEAR_SENTENCE':
      return {
        ...state,
        activeSentence: initialState.activeSentence
      }
    case 'CLICK_WORD':
      if (words[action.wordType]['custom']) {
        return {
          ...state,
          modalType: action.wordType,
          editIndex: action.wordIndex
        }
      }
      else {
        return {
          ...state,
          wordPicker: action.wordType,
          editIndex: action.wordIndex
        }
      }
    case 'EDIT_WORD':
      var editTarget = state.activeSentence[state.editIndex];
      var updatedSentence = [
        ...state.activeSentence.slice(0, state.editIndex),
        {word: action.word, type: editTarget.type},
        ...state.activeSentence.slice(state.editIndex + 1)
      ];
      return {
        ...state,
        wordPicker: null,
        modalType: null,
        activeSentence: updatedSentence
      }
    case 'INPUT_WORD':
      return {
        ...state,
        inputWord: action.word
      }
    case 'REORDER_SENTENCE':
      // console.log("Reordering sentence", state.activeSentence);
      // console.log("Given the item order", action.itemOrder);
      var newSentence = action.itemOrder.map(function(item) {
        return (
          state.activeSentence[parseInt(item.key)]
        )
      });
      console.log("Creating the sentence", newSentence);
      return {
        ...state,
        activeSentence: newSentence
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