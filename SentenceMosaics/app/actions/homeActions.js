import { selectPhoto, 
  showDefaultSentence, 
  clearWordPicker, 
  add_image, 
  delete_image,
  delete_all_images,
} from './index';
import { Actions } from 'react-native-router-flux';
import { Alert, ImagePickerIOS } from 'react-native';

tapTimer = null
ignoreTap = false
waitingForDoubleTap = false

export function importImage() {
  return (dispatch) => {
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      dispatch(add_image(imageUri))
    }, error => {})
  }
}

export function takePhoto() {
  console.log("taking photo");
  return (dispatch) => {
    Actions.camera();
  }
}

export function deleteAllPhotos() {
  return(dispatch) => {
      Alert.alert(
      'Delete All Photos?',
      'Are you sure you want to delete all photos?',
      [{
        text: 'Yes', 
        onPress: () => dispatch(delete_all_images()), 
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
      onPress: () => dispatch(delete_image(index)), 
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
