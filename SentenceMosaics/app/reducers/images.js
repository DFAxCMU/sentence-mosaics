'use strict';

const initialState = {
  image_list: [[{image: 'https://s-media-cache-ak0.pinimg.com/564x/21/c4/af/21c4af62d979e779f08730def389c7a4.jpg',
      sentence_strings: [],
      image_index: 0}]], 
  image_count: 1, 
};

/*'https://s-media-cache-ak0.pinimg.com/564x/21/c4/af/21c4af62d979e779f08730def389c7a4.jpg', 
    'https://pulsations.files.wordpress.com/2010/05/randomdog.jpg', 
    'https://alpha.wallhaven.cc/wallpapers/thumb/small/th-439774.jpg',
   'https://s-media-cache-ak0.pinimg.com/736x/1c/2b/0e/1c2b0e1391f95210ce394d8f6ffc3349.jpg', 
   'https://az616578.vo.msecnd.net/files/responsive/embedded/any/desktop/2016/03/02/6359254205422825251433349260_pointe.jpg',
   'https://d1amk1w0mr5k0.cloudfront.net/files/2012/09/Toddler-Excited-About-Reading-Tips2.jpg', 
   'https://thumbs.dreamstime.com/x/jumping-child-7002757.jpg', 
   'https://www.cfbham.org/wp-content/uploads/2015/04/Childhood-nutrition.jpg', 
   'https://thumbs.dreamstime.com/x/child-swimming-17490975.jpg', 
    'https://static1.squarespace.com/static/53f25b20e4b0d6b2d8640379/t/553e2672e4b06614df78db39/1430136459547/', 
    'https://wesayyesprogram.com/wp-content/uploads/2015/07/man-walking-dog.jpg', 
    'https://ionehellobeautiful.files.wordpress.com/2015/02/mom-cooking-dinner.jpg?quality=70&strip=all&w=630&h=420'
*/



import {persistStore} from 'redux-persist'

export default function images(state=initialState, action) {

console.log(state)
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