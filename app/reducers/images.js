'use strict';

const homeFolder = 'Home Folder';

const initialState = {
  folder: homeFolder,
  folder_list: [
    homeFolder],
  image_list: [],
  image_count: 0,
};

import {persistStore} from 'redux-persist'
import * as Actions from '../actions/index';

export default function images(state=initialState, action) {
console.log("images reducer: ", state)
  switch (action.type) {
    case Actions.SET_FOLDER:
      return ({
        ...state,
        folder: action.folder
      });
    case Actions.CREATE_FOLDER:
      var newFolderList = state.folder_list.slice();
      newFolderList.push(action.folderName);
      return ({
        ...state,
        folder: action.folderName,
        folder_list: newFolderList
      })
    case Actions.RENAME_FOLDER:
      var newFolderList = state.folder_list.slice();
      var index = state.folder_list.indexOf(state.folder);
      newFolderList[index] = action.name;
      return ({
        ...state,
        folder: action.name,
        folder_list: newFolderList
      })
    case Actions.DELETE_FOLDER:
      var newFolderList = state.folder_list.slice();
      if (state.folder != homeFolder) {
        var index = state.folder_list.indexOf(state.folder);
        newFolderList.splice(index, 1);
      }
      return ({
          ...state,
          folder: homeFolder,
          folder_list: newFolderList
        })
    case Actions.ADD_IMAGE:
      return ({
        ...state,
        image_list: state.image_list.concat([{
            image: action.image,
            sentence_strings: [],
            image_index: state.image_count,
            folder: state.folder,
        }]),
        image_count: state.image_count + 1,
      });
    case Actions.DELETE_IMAGE:
      var left_half = state.image_list.slice(0,action.image_index);
      var right_half = state.image_list.slice(action.image_index + 1);
      for (var i = 0; i < right_half.length; i++) {
        //operating on a copy
        var image = right_half[i];
        image.image_index -= 1;
      }
      return ({
        ...state,
        image_list: left_half.concat(right_half),
        image_count: Math.max(state.image_count - 1, 0),
      });
    case Actions.DELETE_ALL_IMAGES:
      var new_image_list = state.image_list.filter(image => {
        console.log(image['folder'])
        console.log(image['folder']==state.folder)
        return image["folder"]!=state.folder
    })
      console.log(state.folder)
      console.log(new_image_list)
      return ({
        ...state,
        image_list: new_image_list,
        image_count: new_image_list.length, 
      });
    case Actions.ADD_SENTENCE:
        console.log("add sentence", action, action.image_index);
        var sentence_string = action.sentence;
        var image_index = action.image_index;
        var current_sentences = state.image_list[image_index].sentence_strings.slice();
        var new_sentences  = current_sentences.concat([sentence_string]);
        var left_half = state.image_list.slice(0,image_index);
        var middle = [{
            image: state.image_list[image_index].image,
            sentence_strings: new_sentences,
            image_index: state.image_list[image_index].image_index,
            folder: state.image_list[image_index].folder,
        }];
        var right_half = state.image_list.slice(image_index +1);
        var new_images = left_half.concat(middle.concat(right_half));
        console.log(middle);
        console.log(new_images);
        return ({
          ...state,
          image_list: new_images,
        });
    case Actions.REMOVE_SENTENCE:
        var image_index = action.image_index;
        var sentence_index = action.sentence_index;
        var current_sentences = state.image_list[image_index].sentence_strings.slice();
        var new_sentences  = current_sentences.slice(0,sentence_index).concat(current_sentences.slice(sentence_index + 1));
        var left_half = state.image_list.slice(0,image_index);
        var middle = [{
            image: state.image_list[image_index].image,
            sentence_strings: new_sentences,
            image_index: state.image_list[image_index].image_index,
            folder: state.image_list[image_index].folder,
        }];
        var right_half = state.image_list.slice(image_index +1);
        var new_images = left_half.concat(middle.concat(right_half));
        return ({
          ...state,
          image_list: new_images,
        });
    default:
      return state
  }
}
