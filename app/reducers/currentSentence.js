'use strict';

import { CameraRoll } from 'react-native';
import { ActionConst } from 'react-native-router-flux';
import { captureScreen } from "react-native-view-shot";
import { words } from '../words';
import {Router} from 'react-native-router-flux';
import * as Actions from '../actions/index';

const initialState = {
  activeSentence: [{word: '', type: 'pronoun'}, 
                   {word: '', type: 'aux verb'}, 
                   {word: '', type: 'main verb'}],
  activeImageIndex: -1, 
  editIndex: 0,
  inputWord: '',
  modalType: null,
  wordPicker: null,
  itemOrder: [0,1,2],
  sentenceScrollEnabled: true,
};

export default function sentences(state = initialState, action) {
  switch (action.type) {
    case Actions.ADD_WORD:
      return {
        ...state,
        activeSentence: state.activeSentence.concat([{word: action.word, type: action.wordType}]),
        itemOrder: state.itemOrder.concat([state.activeSentence.length])
      }
    case Actions.DELETE_WORD:
      var deleteIndex = state.itemOrder.indexOf(action.wordIndex)
      var newItemOrder = [
        ...state.itemOrder.slice(0, deleteIndex),
        ...state.itemOrder.slice(deleteIndex + 1)
      ];
      var updatedSentence = [
        ...state.activeSentence.slice(0, action.wordIndex),
        {word: 'NULL', type: 'NULL'},
        ...state.activeSentence.slice(action.wordIndex + 1)
      ];
      return {
        ...state,
        activeSentence: updatedSentence,
        itemOrder: newItemOrder
      }
    case Actions.SHOW_DEFAULT_SENTENCE:
      return {
        ...state,
        activeSentence: initialState.activeSentence,
        itemOrder: initialState.itemOrder
      }
    case Actions.CLEAR_SENTENCE:
      return {
        ...state,
        activeSentence: [],
        itemOrder: []
      }
    case Actions.TAKE_SCREENSHOT:
      captureScreen({
        format: "jpg",
        quality: 0.8
      })
      .then(
        uri => {
          CameraRoll.saveToCameraRoll(uri, 'photo');
      },
        error => console.error("Snapshot failed:", error)
      );
      return {
        ...state
      }
    case Actions.CLEAR_SENTENCE:
      return {
        ...state
      }
    case Actions.CLICK_WORD:
      return {
        ...state,
        wordPicker: action.wordType,
        editIndex: action.wordIndex
      }
    case Actions.EDIT_WORD:
      var wordType = state.activeSentence[action.wordIndex].type;
      var updatedSentence = [
        ...state.activeSentence.slice(0, action.wordIndex),
        {word: action.word, type: wordType},
        ...state.activeSentence.slice(action.wordIndex + 1)
      ];
      if (updatedSentence[action.wordIndex]['word'] == '+') {
        return {
          ...state,
          wordPicker: null,
          editIndex: action.wordIndex,
          modalType: wordType,
        }
      } else {
        return {
          ...state,
          wordPicker: null,
          modalType: null,
          activeSentence: updatedSentence
        }
      }
    case Actions.GO_BACK:
      return {
        ...state,
        wordPicker: null,
        modalType: null,
        activeSentence: state.activeSentence
      }
    case Actions.CLEAR_WORDPICKER:
      return {
        ...state, 
        wordPicker: null
      }
    case Actions.INPUT_WORD:
      return {
        ...state,
        inputWord: action.word
      }
    case Actions.SENTENCE_DRAG_IN_PROGRESS:
      return {
        ...state,
        sentenceScrollEnabled: false
      }
    case Actions.REORDER_SENTENCE:
      var newItemOrder = action.itemOrder.map(function(item) {
          return ( parseInt(item.key) )
      });

      return {
        ...state,
        itemOrder: newItemOrder,
        sentenceScrollEnabled: true
      }
    case Actions.SELECT_PHOTO:
      return {
        ...state,
        activeImageIndex: action.index
      }
    case Actions.SET_MODAL:
      return {
        ...state,
        modalType: action.modalType
      }
    default:
      return state
  }
}
