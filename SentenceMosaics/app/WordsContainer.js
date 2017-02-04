'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Container,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

export default class WordsContainer extends Component {
  render() {
    return (
      <View style={styles.wordsContainer}>
        <TouchableHighlight
          onPress={() => this.props.setModal(true, 'noun')}
          style={[styles.typeContainer, styles.noun]} >
          <Text style={styles.text}>+ Noun</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => this.props.setModal(true, 'verb')}
          style={[styles.typeContainer, styles.verb]} >
          <Text style={styles.text}>+ Main Verb</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wordsContainer: {
    height: 300,
    margin: 10,
    backgroundColor: '#a7d2c8',
    padding: 10,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
  },
  typeContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  noun: {
    backgroundColor: '#ea5e37',
  },
  verb: {
    backgroundColor: '#47ab48',
  },
  text: {
    color: 'white',
  }
});