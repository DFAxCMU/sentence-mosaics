import { selectPhoto, 
  showDefaultSentence, 
  clearWordPicker, 
  add_image, 
  delete_image
} from './index';
import { Actions } from 'react-native-router-flux';
import { Alert, ImagePickerIOS } from 'react-native';

export function onPhotoClick(index) {
  return (dispatch) => {
    dispatch(selectPhoto(index));
    Actions.chooseSaveOrNew();
    dispatch(showDefaultSentence());
    dispatch(clearWordPicker);
  }
}

export function onPhotoLongPress(index) {
  return (dispatch) => {
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
} 

export function importImage() {
  return (dispatch) => {
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      dispatch(add_image(imageUri))
    }, error => {})
  }
}
