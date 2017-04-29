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
    
    if (type == 'punctuation') { // add thin gray outline
      wordTypeStyle = ([
        wordTypeStyle,
        { borderColor: '#aaa', borderWidth: 1.0 }
      ]);
    }

    var displayText = words[type]['custom'] ? '+ ' + type : type;

    wordTypes.push(
      <TouchableHighlight
        onPress={addBlankWord.bind(this, type)}
        key={type}
        style={wordTypeStyle}>
        <Text style={styles.wordText}>{displayText}</Text>
      </TouchableHighlight>
    )
  }

  return (
    <ScrollView style={styles.wordsScrollContainer}>
      <View style={styles.wordsContainer}>
        { wordTypes }
      </View>
    </ScrollView>
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