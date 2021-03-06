import { 
  setFolder,
  createFolder,
  deleteFolder,
  renameFolder,
  selectPhoto, 
  showDefaultSentence, 
  clearWordPicker, 
  add_image, 
  delete_image,
  delete_all_images,
} from './index';
import { Actions } from 'react-native-router-flux';
import { Alert, ImagePickerIOS, AlertIOS } from 'react-native';
import ImagePicker from 'react-native-image-picker';

tapTimer = null
ignoreTap = false
waitingForDoubleTap = false

export function handleSetFolder(folder) {
  return (dispatch) => {
    dispatch(setFolder(folder));
  }
}

export function handleCreateFolder() {
  return (dispatch) => {
    AlertIOS.prompt('New Folder Name', 'Remember to choose a name that is not already a folder!', name => {
      if (name.trim()) {
        dispatch(createFolder(name));
        Actions.homeDrawer();  
      } else {
        AlertIOS.alert('Folder name cannot be empty!');
      }
    });
  }
}

export function handleRenameFolder() {
  return dispatch => {
    AlertIOS.prompt('Rename Folder',  'Remember to choose a name that is not already a folder!', name => {
      if (name.trim()) {
        dispatch(renameFolder(name));
        Actions.homeDrawer();
      } else {
        AlertIOS.alert('Folder name cannot be empty!');
      }
    })
  }
}

export function handleDeleteFolder() {
  return dispatch => {
    dispatch(deleteFolder());
    Actions.homeDrawer();
  }
}

export function importImage(folder) {
    return (dispatch) => {
        ImagePicker.showImagePicker({}, response => {
            if(response.uri) {
                dispatch(add_image(response.uri, folder))
            }
        })
    }
}


//export function importImage(folder) {
//  return (dispatch) => {
//    ImagePickerIOS.openSelectDialog({}, imageUri => {
//      dispatch(add_image(imageUri, folder))
//    }, error => {})
//  }
//}

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
    console.log("single click", index);
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
