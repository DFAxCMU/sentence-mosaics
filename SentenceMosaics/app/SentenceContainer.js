'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Container,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

export default class SentenceContainer extends Component {
  render() {
    var sentence = this.props.sentence.map(function(item) {
      return (
        <Text style={styles.word}>{item.word}</Text>
      )
    });

    return (
      <View style={styles.sentenceContainer}>
        { sentence }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sentenceContainer: {
    height: 200,
    margin: 10,
    backgroundColor: '#f0f4f4',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    padding: 10,
  },
  word: {
    height: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
  }
});