'use strict';

const initialState = {
  image_list: [], 
  image_count: 0, 
};

import {persistStore} from 'redux-persist'

export default function images(state=initialState, action) {

  switch (action.type) {
    case 'ADD_IMAGE':
      return ({
        ...state,
        image_list: state.image_list.concat([{
            image: action.image, 
            sentence_strings: [],
            image_index: state.image_count,
        }]), 
        image_count: state.image_count + 1,
      });
    case 'DELETE_IMAGE':
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
    case 'ADD_SENTENCE': 
        var sentence_string = action.sentence;
        var image_index = action.image_index;
        var current_sentences = state.image_list[image_index].sentence_strings.slice();
        var new_sentences  = current_sentences.concat([sentence_string]);
        var left_half = state.image_list.slice(0,image_index);
        var middle = [{
            image: state.image_list[image_index].image, 
            sentence_strings: new_sentences,
            image_index: state.image_list[image_index].image_index, 
        }];
        var right_half = state.image_list.slice(image_index +1);
        var new_images = left_half.concat(middle.concat(right_half));
        return ({
          ...state,
          image_list: new_images,
        });
    case 'REMOVE_SENTENCE':
        var image_index = action.image_index;
        var sentence_index = action.sentence_index;
        var current_sentences = state.image_list[image_index].sentence_strings.slice();
        var new_sentences  = current_sentences.slice(0,sentence_index).concat(current_sentences.slice(sentence_index + 1));
        var left_half = state.image_list.slice(0,image_index);
        var middle = [{
            image: state.image_list[image_index].image, 
            sentence_strings: new_sentences,
            image_index: state.image_list[image_index].image_index, 
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