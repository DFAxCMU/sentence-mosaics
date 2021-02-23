import * as FileSystem from 'expo-file-system';

/* Action Types */
export const ADD_SENTENCE = 'ADD_SENTENCE';
export const REMOVE_SENTENCE = 'REMOVE_SENTENCE';

/* Action Creators */
export function addSentence(image, text, recording) {
    return (dispatch, getState) => {
      if(recording) {
        const fileName = `${ FileSystem.documentDirectory }/recordings/recording${ getState().savedSentences.nextId }.caf`;
        FileSystem.copyAsync({ from: recording, to: fileName }).then(() => {
          dispatch({
            type: ADD_SENTENCE,
            image,
            text,
            recordingUri: fileName,
          })
        }).catch(x => console.log("didnt save cuz", x)) 
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
  console.log(id)
  return  {
    type: REMOVE_SENTENCE,
    id,
  }
}
