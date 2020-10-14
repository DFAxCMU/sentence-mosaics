
export default function recordings(state, action) {
  switch(action.type) {
    case 'SAVE_RECORDING': {
      return state.recordings.concat([{ url: action.url, sentence: }])
    }
    default: {
      return []
    }
  }
}