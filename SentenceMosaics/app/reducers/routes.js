'use strict';

import { ActionConst } from 'react-native-router-flux';

const initialState = {
  scene: {}
};

export default function routes(state = initialState, action = {}) {
  switch (action.type) {
    case ActionConst.FOCUS:
      return {
        scene: action.scene,
      };
    default:
      return state;
  }
}