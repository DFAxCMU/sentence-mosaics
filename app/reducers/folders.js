import {
  SET_FOLDER,
  CREATE_FOLDER,
  RENAME_FOLDER,
  DELETE_FOLDER,
} from '../actions/index.js';

export default function folders(state, action) {
  switch(action.type) {
    case SET_FOLDER:
      return {
        ...state,
        currentFolder: action.id,
      }
    case CREATE_FOLDER:
      const id = 'folder' + state.nextId;
      return {
        byId: {
          ...state.byId,
          [id]: {
            name: action.name,
            images: [],
          }
        },
        allIds: state.allIds.concat([id]),
        nextId: state.nextId + 1,
        currentFolder: id,
      }
    case RENAME_FOLDER:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            name: action.name,
          }
        }
      }
    case DELETE_FOLDER:
      const byId = { ...state.byId }
      delete byId[action.id]
      return {
        ...state,
        byId: byId,
        allIds: state.allIds.filter(id => id !== action.id),
        currentFolder: action.id === state.currentFolder ? 
          'home' : state.currentFolder,
      }
    case ADD_IMAGE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.folder]: {
            ...state.byId[action.folder],
            images: state.byId[action.folder].images.concat
          }
        }
      }
    default: 
      return state || {
        byId: {
          'home': {
            name: 'Home Folder',
            images: [],
          }
        },
        allIds: ['home'],
        nextId: 0,
        currentFolder: 'home',
      }
  }
}
