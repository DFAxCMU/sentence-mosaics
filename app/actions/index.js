'use strict';

/* Action Types */
export const ADD_WORD = 'ADD_WORD';
export const DELETE_WORD = 'DELETE_WORD';
export const SHOW_DEFAULT_SENTENCE = 'SHOW_DEFAULT_SENTENCE';
export const CLEAR_SENTENCE = 'CLEAR_SENTENCE';
export const TAKE_SCREENSHOT = 'TAKE_SCREENSHOT';
export const CLICK_WORD = 'CLICK_WORD';
export const EDIT_WORD = 'EDIT_WORD';
export const GO_BACK = 'GO_BACK';
export const CLEAR_WORDPICKER = 'CLEAR_WORDPICKER';
export const INPUT_WORD = 'INPUT_WORD';
export const SENTENCE_DRAG_IN_PROGRESS = 'SENTENCE_DRAG_IN_PROGRESS';
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

export function deleteWord(wordIndex) {
  return {
    type: DELETE_WORD,
    wordIndex
  }
}

export function showDefaultSentence() {
  return {
    type: SHOW_DEFAULT_SENTENCE,
  }
}

export function clearSentence() {
  return {
    type: CLEAR_SENTENCE,
  }
}

export function takeScreenshot() {
  return {
    type: TAKE_SCREENSHOT,
  }
}

export function clickWord(wordType, wordIndex) {
  return {
    type: CLICK_WORD,
    wordType,
    wordIndex
  }
}

export function editWord(word, wordIndex) {
  return {
    type: EDIT_WORD,
    word,
    wordIndex
  }
}

export function goBack() {
  return {
    type: GO_BACK
  }
}

export function clearWordPicker() {
  return {
    type: CLEAR_WORDPICKER
  }
}

export function inputWord(word) {
  return {
    type: INPUT_WORD,
    word
  }
}

export function sentenceDragInProgress() {
  return {
    type: SENTENCE_DRAG_IN_PROGRESS
  }
}

export function reorderSentence(itemOrder) {
  return {
    type: REORDER_SENTENCE,
    itemOrder
  }
}

export function selectPhoto(index) {
  return {
    type: SELECT_PHOTO,
    index 
  }
}

export function setModal(modalType) {
  return {
    type: SET_MODAL,
    modalType
  }
}

