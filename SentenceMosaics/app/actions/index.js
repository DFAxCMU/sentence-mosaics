'use strict';

/* Action Types */
export const SET_FOLDER = 'SET_FOLDER';
export const CREATE_FOLDER = 'CREATE_FOLDER';
export const DELETE_FOLDER = 'DELETE_FOLDER';
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
export const ADD_IMAGE = 'ADD_IMAGE';
export const DELETE_IMAGE = 'DELETE_IMAGE';
export const DELETE_ALL_IMAGES = 'DELETE_ALL_IMAGES'
export const ADD_SENTENCE = 'ADD_SENTENCE';
export const REMOVE_SENTENCE = 'REMOVE_SENTENCE';

/* Action Creators */
export function setFolder(folder) {
  return {
    type: SET_FOLDER,
    folder,
  }
}

export function createFolder(folderName) {
  return {
    type: CREATE_FOLDER,
    folderName,
  }
}

export function deleteFolder() {
  return {
    type: DELETE_FOLDER,
  }
}

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

export function add_image(image, folder) {
  return {
    type: ADD_IMAGE,
    image, 
    folder
  }
}

export function delete_image(image_index) {
  image_index = parseInt(image_index);
  return {
    type: DELETE_IMAGE,
    image_index
  }
}

export function delete_all_images() {
  return {
    type: DELETE_ALL_IMAGES
  }
}

export function add_sentence(image_index,sentence) {
  image_index = parseInt(image_index);
  return {
    type: ADD_SENTENCE,
    image_index,
    sentence
  }
}

export function remove_sentence(image_index,sentence_index) {
  image_index = parseInt(image_index);
  sentence_index = parseInt(sentence_index);
  return  {
    type: REMOVE_SENTENCE,
    image_index,
    sentence_index
  }
}