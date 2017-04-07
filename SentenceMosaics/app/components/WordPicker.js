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

const WordPicker = ({ wordType, editWordClick }) => {
  var categories = [];
  var wordList = words[wordType]['categories'];
  var idx = 0;
  for (var category in wordList) {
    var wordStyle = ([
      styles.categoryWord,
      { backgroundColor: words[wordType]['color'] }
    ]);
    var wordOptions = wordList[category].map((item,index) =>
      <TouchableHighlight
        key={index}
        underlayColor='transparent'
        onPress={editWordClick.bind(this,item)}>
        <Text style={wordStyle}>{item}</Text>
      </TouchableHighlight>
    );
    categories.push(
      <View key={idx} style={styles.page}>
        <Text style={styles.categoryHeader}>{category}</Text>
        <View style={styles.categoryContainer}>
          { wordOptions }
        </View>
      </View>
    );
    idx++;
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
    editWordClick: (word) => {
      dispatch(editWord(word))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    wordType: state.sentences.wordPicker
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WordPicker)