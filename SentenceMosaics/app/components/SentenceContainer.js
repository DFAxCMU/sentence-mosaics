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

import { clickWord } from '../actions';
import { styles } from '../styles';
import { words } from '../words';

const SentenceContainer = ({ sentence, onWordClick })  => {
  var fullSentence = sentence.map(function(item, index) {
    var wordStyle = ([
      styles.word,
      { backgroundColor: words[item.type]['color'] }
    ]);
    return (
      <TouchableHighlight
        underlayColor='transparent'
        key={index}
        onPress={onWordClick.bind(this,item.type,index)}>
        <Text style={wordStyle}>{item.word}</Text>
      </TouchableHighlight>
    )
  });

  return (
          <View style={styles.sentenceContainer}>
            { fullSentence }
            <View style={styles.blankWord}></View>
          </View>
  );
};

/* Container Component */

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

export default connect(mapStateToProps, mapDispatchToProps)(SentenceContainer)