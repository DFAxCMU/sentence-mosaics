import React, { PropTypes } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const Constants = {
  CUSTOM_RED: '#f22335',
  ICON_GREY_COLOR: '#6b6b6b',
}

export default function RecordButton(props) {
  const { isRecording, isFinishRecorded, onPressHandler} = props
  
  let text = 'Tap to record'
  if (isRecording) {
    text = 'Recording...'
  } 
  if (isFinishRecorded) {
    text = 'Tap to renew'
  }
  
  if (isRecording) {
    return (
      <View style={styles.button}>
        <Icon name='microphone' size={80} color={Constants.CUSTOM_RED}/>
        <Text style={styles.text}>{ text }</Text>
      </View>
    )
  }
  return (
    <TouchableOpacity style={styles.button} onPress={onPressHandler}>
      <Icon name='microphone' size={80} color={Constants.CUSTOM_RED}/>
      <Text style={styles.text}>{ text }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 150,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 2,
    borderColor: Constants.ICON_GREY_COLOR,
    marginBottom: 10,
  },
  text: {
    paddingTop: 5,
    fontSize: 16,
    color: Constants.CUSTOM_RED,
  },
})
