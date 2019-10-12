import React, { PropTypes } from 'react'
import {
  View,
  StyleSheet,
  Platform
} from 'react-native'

import IconButton from './IconButton'

export default function ActionButtons(props) {
  const {
    isFinishRecorded, 
    isRecording, 
    playPauseIcon, 
    playPauseHandler, 
    stopRecording
  } = props
  return (
    <View style={{
      flex: 1,
      flexDirection: 'row',
    }}>
      <IconButton 
        iconName='stop' 
        isDisabled={isFinishRecorded || !isRecording} 
        onPressHandler={stopRecording} />
      <IconButton 
        iconName={playPauseIcon}
        isDisabled={!isFinishRecorded || isRecording} 
        onPressHandler={playPauseHandler} />
    </View>
  )
}
