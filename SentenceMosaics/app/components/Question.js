import React, { PropTypes } from 'react'
import {
  View,
  Text,
} from 'react-native'

export default function Question(props) {
  return (
    <View>
      <Text style={{ margin: 20, fontSize: 24, fontWeight: 'bold'}}>  { props.question } </Text>
      <Text style={{ fontSize: 18, fontStyle: 'italic'}}> { props.answer } </Text>
    </View>
  )
}