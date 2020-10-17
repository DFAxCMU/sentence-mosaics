export default function recordings(state, action) {
  switch(action.type) {
    case 'SAVE_RECORDING': {
      const id = 'recording' + id;
      return {
        byId: {
          ...state.byId,
          [id]: {
            uri: action.uri,
          }
        }
      }
    }
    case 'REMOVE_SENTENCE': {
      return state
    }
    default: {
      return state || {
        byId: { },
        allIds: [],
        nextId: 0,
      }
    }
  }
}
