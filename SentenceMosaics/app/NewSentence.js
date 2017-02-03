'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

export default class NewSentence extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: this.props.uri}}
          style={styles.image}
          resize='contain' />
        <View style={styles.sentenceContainer}>
          <Text>Sentence formation goes here.</Text>
        </View>
        <View style={styles.wordsContainer}>
          <Text>Word options go here.</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wordsContainer: {
    height: 300,
    margin: 10,
    backgroundColor: '#a7d2c8',
  },
  sentenceContainer: {
    height: 200,
    margin: 10,
    backgroundColor: '#f0f4f4',
  },
  image: {
    margin: 10,
    height: 300,
    width: 400,
  }
});