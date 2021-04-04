'use strict';
import { 
  ADD_IMAGE, 
  DELETE_IMAGE, 
  DELETE_ALL_IMAGES 
} from '../actions/imageActions.js';

import { 
  SET_FOLDER,
  CREATE_FOLDER,
  RENAME_FOLDER,
  DELETE_FOLDER,
} from '../actions/folderActions.js';

const homeFolder = 'Home Folder';

const initialState = {
  currentFolder: homeFolder,
  folders: [homeFolder],
  byId: { },
  allIds: [ ],
  nextId: 0,
};

export default function images(state=initialState, action) {
  switch (action.type) {
    case SET_FOLDER: {
      return {
        ...state,
        currentFolder: action.id,
      }
    }
    case CREATE_FOLDER: {
      return {
        ...state,
        currentFolder: action.name,
        folders: state.folders.concat([action.name]),
      }
    }
    case RENAME_FOLDER: {
      const index = state.folders.indexOf(state.currentFolder);
      let byId = {}
      state.allIds.forEach(id => {
        if(state.byId[id].folder === state.currentFolder) {
          byId[id] = {
            ...state.byId[id],
            folder: state.currentFolder
          }
        }
        else {
          byId[id] = {
            ...state.byId[id]
          }
        }
      })
      return {
        ...state,
        currentFolder: action.name,
        folders: state.folders.map(folder => folder === state.currentFolder ? action.name : folder),
        byId,
      }
    }
    case DELETE_FOLDER:
      return {
        ...state,
        allIds: state.allIds.filter(id => state.byId[id].folder !== state.currentFolder),
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
