'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Container,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';

import { editWord, goBack } from '../actions';
import { styles } from '../styles';
import { words } from '../words';

const WordPicker = ({ wordType, wordIndex, editWordClick, goBackClick }) => {
  var categories = [];

  var wordTypePlural = wordType == "punctuation" 
                            || wordType == "wh-"
                            || wordType == "social"
                        ? wordType 
                        : wordType + "s";
  var wordList = words[wordType]['categories'];
  for (var category in wordList) {
    var wordStyle = ([
      styles.categoryWord,
      { backgroundColor: words[wordType]['color'] }
    ]);

    if (wordType == 'punctuation') { // add thin gray outline
      wordStyle = ([
        wordStyle,
        { borderColor: '#aaa', borderWidth: 1.0 }
      ]);
    }

    var wordOptions = wordList[category].map(item => {
      var labelText = item;
      if (wordIndex === 0) {
        labelText = item[0].toUpperCase() + item.substring(1);
      }
      return (
        <TouchableHighlight
        style={wordStyle}
        underlayColor='transparent'
        key={item}
        onPress={editWordClick.bind(this, labelText, wordIndex)}>
        <Text key={item} style={styles.wordText}>{labelText}</Text>
      </TouchableHighlight>
      );
    }
    );
    var categoryTitle = category !== 'all' ? 
      <Text key={category} style={styles.categoryHeader}>{category}</Text>
      : null;
    categories.push(
      <View key={category + "_view" } style={styles.page}>
        { categoryTitle }
        <View style={styles.categoryContainer}>
          { wordOptions }
        </View>
      </View>
    );
  }

  return (
  <ScrollView style={styles.wordPickerScrollContainer}> 
    <View style={styles.wordPickerContainer}>
      <Text style={styles.wordsHeader}>{ wordTypePlural }</Text>
      <View style={styles.wordPicker}>
        { categories }
      </View>
      <Button title = "Go Back" 
              onPress = {() => goBackClick()} />
    </View>
  </ScrollView>
  );
}

/* Container Component */

const mapDispatchToProps = (dispatch) => {
  return {
    editWordClick: (word, wordIndex) => {
      dispatch(editWord(word,wordIndex))
    }, 
    goBackClick: () => {
      dispatch(goBack())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    wordType: state.currentSentence.wordPicker,
    wordIndex: state.currentSentence.editIndex,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WordPicker)
