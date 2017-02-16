'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Container,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';

import { editWord } from '../actions';
import { styles } from '../styles';
import { words } from '../words';

const WordPicker = ({ wordType, wordIndex, editWordClick }) => {
  var categories = [];
  var wordList = words[wordType]['categories'];
  for (var category in wordList) {
    var wordStyle = ([
      styles.categoryWord,
      { backgroundColor: words[wordType]['color'] }
    ]);
    var wordOptions = wordList[category].map(item =>
      <TouchableHighlight
        underlayColor='transparent'
        onPress={editWordClick.bind(this,item,wordIndex)}>
        <Text style={wordStyle}>{item}</Text>
      </TouchableHighlight>
    );
    categories.push(
      <View style={styles.page}>
        <Text style={styles.categoryHeader}>{category}</Text>
        <View style={styles.categoryContainer}>
          { wordOptions }
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.wordsPicker}>
      { categories }
    </ScrollView>
  );
}

/* Container Component */

const mapDispatchToProps = (dispatch) => {
  return {
    editWordClick: (word, wordIndex) => {
      dispatch(editWord(word,wordIndex))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    wordType: state.sentences.wordPicker,
    wordIndex: state.sentences.editIndex,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WordPicker)