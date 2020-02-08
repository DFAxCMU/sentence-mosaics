import React, { Component } from 'react'
import {
  Platform,
  View,
  StyleSheet,
  ProgressBarAndroid,
  ProgressViewIOS
} from 'react-native'

const Constants = {
  progressColor: '#f22335'
}

export default function RecordButton(props) {
  const {progressVal} = props

  return(
    <View style={styles.MainContainer}>
	{
	(Platform.OS === 'android')
	?
        (<ProgressBarAndroid
	  color={Constants.progressColor}
	  styleAttr="Horizontal"
	  progress={progressVal}
	  indeterminate={false}/>)
	:
	(<ProgressViewIOS
	  progress={progressVal}
	  progressTintColor={Constants.progressColor}/>)
      }
    </View>
  )
}

const styles = StyleSheet.create(
{
  MainContainer:
  {
    flex: 1,
    justifyContent: 'center',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    margin: 20
  }
})
