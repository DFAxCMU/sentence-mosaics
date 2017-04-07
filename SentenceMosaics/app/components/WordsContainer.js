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
  var idx = 0;
  for (var type in words) {
    var wordTypeStyle = ([
      styles.typeContainer,
      { backgroundColor: words[type]['color'] }
    ]);
    wordTypes.push(
      <TouchableHighlight
        key={idx}
        onPress={addBlankWord.bind(this, type)}
        style={wordTypeStyle}>
        <Text>+ {type}</Text>
      </TouchableHighlight>
    );
    idx++;
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