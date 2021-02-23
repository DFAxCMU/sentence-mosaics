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
import * as ImagePicker from 'expo-image-picker';
//import { Alert } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import { 
    addImage,
    deleteImage,
    deleteAllImages,
} from './imageActions.js';

tapTimer = null
ignoreTap = false
waitingForDoubleTap = false

export function handleSetFolder(folder) {
  return (dispatch) => {
    dispatch(setFolder(folder));
  }
}

export function handleCreateFolder(name) {
  return (dispatch) => {
    dispatch(createFolder(name));
    Actions.homeDrawer();
  }
}

export function handleRenameFolder(name) {
  return dispatch => {
    dispatch(renameFolder(name));
    Actions.homeDrawer();
  }
}

export function handleDeleteFolder() {
  return dispatch => {
    dispatch(deleteFolder());
    Actions.homeDrawer();
  }
}

export function importImage() {
  return (dispatch) => {
    Permissions.askAsync(Permissions.CAMERA_ROLL) // ask permissions to change camera roll
      .then(function(response) {
        if(response.status === 'granted') {
          //console.log(here)
          return ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
          })
        }
        else {
          throw "Error"
        }
      }).then(response => {
        if(response.uri) {
          console.log(response.uri)
          dispatch(add_image(response.uri))
        }
    }).catch(function(error) {
      console.log(error)
    })
  }
}
export function takePicture() {
  return (dispatch, getState) => {
      Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
        .then(function(response) {
        if(response.status === 'granted') {
          return ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
          })
        }
        else {
          throw "Error"
        }
      }).then(response => {
        console.log(response.uri);
        const fileName = `${ FileSystem.documentDirectory }/images/image${ getState().images.nextId }.jpg`;
          console.log(fileName)
        return FileSystem.copyAsync({ from: response.uri, to: fileName })
              .then(uri => {
                  if(uri) {
                      dispatch(add_image(uri))
                  }
              })
      }).catch(function(error) {
        console.log(error)
      })
  }
}

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
