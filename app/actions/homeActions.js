import {
  setFolder,
  createFolder,
  deleteFolder,
  renameFolder,
  selectPhoto,
  showDefaultSentence,
  clearWordPicker,
} from './index';
import { Actions } from 'react-native-router-flux';
import { Alert, ImagePickerIOS, AlertIOS, CameraRoll } from 'react-native';

import { 
    addImage,
    deleteImage,
    deleteAllImages,
} from './imageActions.js';

tapTimer = null
ignoreTap = false
waitingForDoubleTap = false


export function deleteAllPhotos() {
  return(dispatch) => {
      Alert.alert(
      'Delete All Photos?',
      'Are you sure you want to delete all photos?',
      [{
        text: 'Yes',
        onPress: () => dispatch(deleteAllImages()),
        style: 'cancel'
      }, {
        text: 'No',
        onPress: () => console.log('No delete all images')
      }]
    )
  }
}

// Determine if single or double tap.
export function handlePhotoTap(index) {
  return (dispatch) => {
    if (ignoreTap) {
      resetTapIgnoreTime();
    }
    // This will be true if we see another tap before the tapTimer in
    // onPhotoSingleTap() runs out.
    waitingForDoubleTap
      ? onPhotoDoubleTap(dispatch, index)
      : onPhotoSingleTap(dispatch, index);
  }
}

function onPhotoSingleTap(dispatch, index) {
  waitingForDoubleTap = true;
  // If 200 ms has passed, this was a single tap.
  tapTimer = setTimeout( () => {

    waitingForDoubleTap = false;
    // Do the single click action
    dispatch(selectPhoto(index));
    Actions.chooseSaveOrNew({ index: index });
    dispatch(showDefaultSentence());
    dispatch(clearWordPicker);
    
  }, 200) // 200 ms is the double tap threshold.
}

function onPhotoDoubleTap(dispatch, index) {
  resetTapIgnoreTime();
  waitingForDoubleTap = false;
  tapIgnore = true;

  // Do the double click action.
  Alert.alert(
    'Delete Image?',
    'Are you sure you want to delete this image?',
    [{
      text: 'Yes',
      onPress: () => dispatch(deleteImage(index)),
      style: 'cancel'
    }, {
      text: 'No',
      onPress: () => console.log('No delete image')
    }]
  )
}

function resetTapIgnoreTime() {
  clearTimeout(tapTimer);
  tapTimer = setTimeout(() => {tapIgnore = false, 200});
}

export function sendAlert(id) {
  return {
    type: DELETE_IMAGE,
    id,
  }
}

export function checkEmptySentence() {
  return function (dispatch, getState) {
    //same as return (dispatch, getState) => {}
    const state = getState();
    console.log(state.currentSentence.activeSentence);
    
    const sentence = state.currentSentence.activeSentence;
    var sentenceString = "";
    const itemOrder = state.currentSentence.itemOrder;
    for (var i = 0; i < itemOrder.length; i++){
      curr = sentence[itemOrder[i]].word
      sentenceString = sentenceString.concat(curr);
    }
    if(sentenceString == ""){
      Alert.alert("This sentence is empty!");
    } else {
      Actions.recordSentence();
    } 
  }
}
