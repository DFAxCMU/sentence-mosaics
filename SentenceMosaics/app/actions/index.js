'use strict';

/* Action Types */
export const ADD_WORD = 'ADD_WORD';
export const CLEAR_SENTENCE = 'CLEAR_SENTENCE';
export const CLICK_WORD = 'CLICK_WORD';
export const EDIT_WORD = 'EDIT_WORD';
export const INPUT_WORD = 'INPUT_WORD';
export const REORDER_SENTENCE = 'REORDER_SENTENCE';
export const SELECT_PHOTO = 'SELECT_PHOTO';
export const SET_MODAL = 'SET_MODAL';

/* Action Creators */
export function addWord(word, wordType) {
  return {
    type: ADD_WORD,
    word,
    wordType
  }
}

export function clearSentence() {
  return {
    type: CLEAR_SENTENCE,
  }
}

export function clickWord(wordType, wordIndex) {
  return {
    type: CLICK_WORD,
    wordType,
    wordIndex
  }
}

export function editWord(word) {
  return {
    type: EDIT_WORD,
    word
  }
}

export function inputWord(word) {
  return {
    type: INPUT_WORD,
    word
  }
}

export function reorderSentence(itemOrder) {
  return {
    type: REORDER_SENTENCE,
    itemOrder
  }
}

export function selectPhoto(uri) {
  return {
    type: SELECT_PHOTO,
    uri
  }
}

export function setModal(modalType) {
  return {
    type: SET_MODAL,
    modalType
  }
}