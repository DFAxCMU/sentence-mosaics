'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Container,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';

import { addWord } from '../actions';
import { styles } from '../styles';
import { words } from '../words';

const WordsContainer = ({ addBlankWord })  => {
  var wordTypes = [];
  for (var type in words) {
    var wordTypeStyle = ([
      styles.typeContainer,
      { backgroundColor: words[type]['color'] }
    ]);
    wordTypes.push(
      <TouchableHighlight
        onPress={addBlankWord.bind(this, type)}
        key={type}
        style={wordTypeStyle}>
        <Text>+ {type}</Text>
      </TouchableHighlight>
    )
  }

  return (
      <View style={styles.wordsContainer}>
        { wordTypes }
      </View>
  )
}

/* Container Component */

const mapDispatchToProps = (dispatch) => {
  return {
    addBlankWord: (wordType) => {
      dispatch(addWord('',wordType))
    }
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(WordsContainer)