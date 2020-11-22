/* Action Types */
export const SET_FOLDER = 'SET_FOLDER';
export const CREATE_FOLDER = 'CREATE_FOLDER';
export const RENAME_FOLDER = 'RENAME_FOLDER';
export const DELETE_FOLDER = 'DELETE_FOLDER';

/* Action Creators */
export function setFolder(id) {
  return {
    type: SET_FOLDER,
    id,
  }
}

export function createFolder(name) {
  return {
    type: CREATE_FOLDER,
    name,
  }
}

export function renameFolder(name) {
  return {
    type: RENAME_FOLDER,
    name,
  }
}

export function deleteFolder() {
  return {
    type: DELETE_FOLDER,
  }
}
