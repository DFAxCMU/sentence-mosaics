import React, { Component } from 'react'
import {
  Platform,
  View,
  StyleSheet,
  ProgressBarAndroid,
  ProgressViewIOS
} from 'react-native'

export default class ProgressBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Progress_Value: 0.00
    }
  }

  render()
  {
    return(
      <View style={styles.MainContainer}>
	{
	  (Platform.OS === 'android')
	  ?
          (<ProgressBarAndroid
	    styleAttr="Horizontal"
	    progress={this.state.Progress_Value}
	    indeterminate={false}/>)
	  :
	  (<ProgressViewIOS progress={this.state.Progress_Value}/>)
	}
      </View>
    )
  }
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
