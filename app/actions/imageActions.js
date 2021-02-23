export const ADD_IMAGE = 'ADD_IMAGE';
export const DELETE_IMAGE = 'DELETE_IMAGE';
export const DELETE_ALL_IMAGES = 'DELETE_ALL_IMAGES'

export function addImage(uri, folder) {
  return {
    type: ADD_IMAGE,
    uri, 
  }
}

export function deleteImage(id) {
  return {
    type: DELETE_IMAGE,
    id,
  }
}

export function deleteAllImages() {
  return (dispatch, getState) => {
    const state = getState().images
    state.byId.forEach(function(image) {
      if (image.folder === state.folder) {
        dispatch(delete_image(image.image_index))
      }
    })
    dispatch({ type: DELETE_ALL_IMAGES })
  }
}

