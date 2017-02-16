'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Container,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';

import { addWord } from '../actions';
import { styles } from '../styles';
import { words } from '../words';

const WordsContainer = ({ setModalClick, addBlankWord })  => {
  var wordTypes = [];
  for (var type in words) {
    var wordTypeStyle = ([
      styles.typeContainer,
      { backgroundColor: words[type]['color'] }
    ]);
    if (words[type]['custom']) {
      wordTypes.push(
        <TouchableHighlight
          onPress={setModalClick.bind(this, type)}
          style={wordTypeStyle}>
          <Text>+ {type}</Text>
        </TouchableHighlight>
      )
    } else {
      wordTypes.push(
        <TouchableHighlight
          onPress={addBlankWord.bind(this, type)}
          style={wordTypeStyle}>
          <Text>+ {type}</Text>
        </TouchableHighlight>
      )
    }
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