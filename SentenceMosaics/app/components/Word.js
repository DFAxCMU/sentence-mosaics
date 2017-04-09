'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { styles } from '../styles';
import { words } from '../words';

import { clickWord } from '../actions';

const Word = ({ sentence, index, onWordClick })  => {
  var targetWord = sentence[index];
  var wordStyle = ([
    styles.word,
    { backgroundColor: words[targetWord.type]['color'], height: globalWordHeight }

  ]);
  return (
    <View style={wordStyle}>
    <Text style={styles.wordText}>
      { targetWord.word }
    </Text>
    </View>
  )
};

// /* Container Component */

const mapDispatchToProps = (dispatch) => {
  return {
    onWordClick: (wordType, wordIndex) => {
      dispatch(clickWord(wordType, wordIndex))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    sentence: state.sentences.activeSentence
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Word)