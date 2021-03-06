import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

/* Action Types */
export const ADD_SENTENCE = 'ADD_SENTENCE';
export const REMOVE_SENTENCE = 'REMOVE_SENTENCE';

/* Action Creators */
export function addSentence(image, text, recording) {
    return (dispatch, getState) => {
      if(recording) {
        MediaLibrary.createAssetAsync(recording).then(asset => {
          console.log(asset)
          dispatch({
            type: ADD_SENTENCE,
            image,
            text,
            recordingUri: asset.uri,
          })
        }).catch(x => console.error("didnt save cuz", x)) 
      }
      else {
        dispatch({
          type: ADD_SENTENCE,
          image,
          text,
        })
      }
    }
}

export function removeSentence(id) {
  return  {
    type: REMOVE_SENTENCE,
    id,
  }
}
