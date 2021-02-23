'use strict';
import * as Actions from '../actions/index';
import { 
    ADD_IMAGE, 
    DELETE_IMAGE, 
    DELETE_ALL_IMAGES 
} from '../actions/imageActions.js'

const homeFolder = 'Home Folder';

const initialState = {
  currentFolder: homeFolder,
  folders: [homeFolder],
  byId: { },
  allIds: [ ],
  nextId: 0,
};

export default function images(state=initialState, action) {
    console.log(action)
  switch (action.type) {
    case Actions.SET_FOLDER: {
      return {
        ...state,
        currentFolder: action.id,
      }
    }
    case Actions.CREATE_FOLDER: {
      return {
        ...state,
        currentFolder: action.name,
        folders: state.folders.concat([action.name]),
      }
    }
    case Actions.RENAME_FOLDER: {
      const index = state.folders.indexOf(state.currentFolder);
      return {
        ...state,
        currentFolder: action.name,
        folders: state.folders.map(folder => folder === state.currentFolder ? action.name : folder),
      }
    }
    case Actions.DELETE_FOLDER:
      return {
        ...state,
        currentFolder: homeFolder,
        folders: state.folders.filter(folder => folder !== state.currentFolder)
      }
    case ADD_IMAGE: {
      const id = `image${ state.nextId }` 
      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            uri: action.uri,
            folder: state.currentFolder,
          }
        },
        allIds: state.allIds.concat([id]),
        nextId: state.nextId + 1,
      }
    }
    case DELETE_IMAGE: {
      const updatedById = { ...state.byId }
      delete updatedById[action.id]
      return {
        ...state,
        byId: updatedById,
        allIds: state.filter(id => id !== action.id),
      }
    }
    case DELETE_ALL_IMAGES: {
      return initialState
    }
    default: {
      return state
    }
  }
}
