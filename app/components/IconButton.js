import React, { PropTypes } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const Constants = {
  CUSTOM_RED: '#f22335',
  ICON_GREY_COLOR: '#6b6b6b',
}

export default function IconButton(props) {
  const { isDisabled, onPressHandler, iconName } = props
  const iconColor = isDisabled ? Constants.ICON_GREY_COLOR : Constants.CUSTOM_RED
  
  if (isDisabled) {
    return (
      <View style={styles.actionBtn}>
        <Icon name={iconName} size={35} color={iconColor} />
      </View>
    )
  }
  return (
    <TouchableOpacity style={styles.actionBtn} onPress={onPressHandler}>
      <Icon name={iconName} size={35} color={iconColor} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  actionBtn: {
    width: 70,
    height: 70,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    borderColor: Constants.ICON_GREY_COLOR,
  },
})
