'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Container,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';

import { clickWord, deleteWord, sentenceDragInProgress, reorderSentence, clearWordPicker } from '../actions';
import { styles } from '../styles';
import { words } from '../words';

import Word from './Word';

import SortableGrid from 'react-native-sortable-grid'

var dim = Dimensions.get('window');

const SentenceContainer = ({ sentence, itemOrder, sentenceScrollEnabled, onWordClick, onWordDoubleClick, onWordBeginDrag, onWordDrag })  => {
  var draggableSentenceWidth = dim.width * 7/8 - 10;
  var itemsPerRow = Math.floor(draggableSentenceWidth / ((3/2) * globalWordWidth));

  var fullSentence = sentence.map(function(item, index) {
    if (itemOrder.indexOf(index) != -1) {
      return (
        <Word 
          key={index}
          index={index}
          onTap={onWordClick.bind(this, item.type, index)}
          onDoubleTap={onWordDoubleClick.bind(this, index)}/>
      )
    } else {
     // We deleted this word so don't make a Word for it
     return null;
    }
  });

  // Remove the null elements
  fullSentence = fullSentence.filter(n => n);

  return (
        <View style={styles.sentenceContainer}>
          <ScrollView style={styles.sentenceScrollContainer}
            scrollEnabled={sentenceScrollEnabled}>
            <SortableGrid 
              style={styles.draggableSentence}
              itemsPerRow = {itemsPerRow}
              doubleTapTreshold = {200} //default is 150 ms
              onDragStart={ () => onWordBeginDrag() }
              onDragRelease = { (result) => onWordDrag(result.itemOrder) }>
              { fullSentence }
            </SortableGrid>
          </ScrollView>
        </View>
  );
};

/* Container Component */

const mapDispatchToProps = (dispatch) => {
  return {
    onWordClick: (wordType, wordIndex) => {
      dispatch(clickWord(wordType, wordIndex))
    },
    onWordDoubleClick: (wordIndex) => {
      dispatch(deleteWord(wordIndex)),
      dispatch(clearWordPicker())
    },
    onWordBeginDrag: () => {
      dispatch(sentenceDragInProgress())
    },
    onWordDrag: (itemOrder) => {
      dispatch(reorderSentence(itemOrder))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    sentence: state.currentSentence.activeSentence,
    itemOrder: state.currentSentence.itemOrder,
    sentenceScrollEnabled: state.currentSentence.sentenceScrollEnabled,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SentenceContainer)
