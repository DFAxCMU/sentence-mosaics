'use strict';

import React, { Component } from 'react';
import {
  Text
} from 'react-native';
import { connect } from 'react-redux';

import { styles } from '../styles';
import { words } from '../words';

const Word = ({ sentence, index })  => {
  var targetWord = sentence[index];
  var wordStyle = ([
    styles.word,
    { backgroundColor: words[targetWord.type]['color'] }
  ]);
  return (
    <Text
      style={wordStyle}>
      { targetWord.word }
    </Text>
  )
};

// /* Container Component */

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = (state) => {
  return {
    sentence: state.sentences.activeSentence
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Word)