'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Container,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import SortableGrid from 'react-native-sortable-grid';

import { clickWord, reorderSentence } from '../actions';
import { styles } from '../styles';
import { words } from '../words';

import Word from './Word';

const SentenceContainer = ({ sentence, onWordClick, onWordDrag })  => {
  var fullSentence = sentence.map(function(item, index) {
    console.log("SentenceContainer: ", item, " at index ", index, " from ", sentence);
    return (
      <Word
        key={item.word+index}
        index={index}
        onTap={onWordClick.bind(this,item.type,index)} />
    )
  });

  //fullSentence.push(<View style={styles.blankWord}></View>);

  return (
    <View style={styles.sentenceContainer}>
      <SortableGrid
        onDragRelease={(result) => onWordDrag(result.itemOrder)}>
        { fullSentence }
      </SortableGrid>
    </View>
  )
}

/* Container Component */

const mapDispatchToProps = (dispatch) => {
  return {
    onWordClick: (wordType, wordIndex) => {
      dispatch(clickWord(wordType, wordIndex))
    },
    onWordDrag: (itemOrder) => {
      dispatch(reorderSentence(itemOrder))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    sentence: state.sentences.activeSentence
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SentenceContainer)