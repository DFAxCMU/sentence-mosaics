'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Container,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';

import { clickWord, reorderSentence } from '../actions';
import { styles } from '../styles';
import { words } from '../words';

import Word from './Word';

import SortableGrid from 'react-native-sortable-grid'

var dim = Dimensions.get('window');

const SentenceContainer = ({ sentence, onWordClick, onWordDrag })  => {
  var draggableSentenceWidth = dim.width * 7/8 - 10;
  var itemsPerRow = Math.floor(draggableSentenceWidth / ((3/2) * globalWordWidth));

  var fullSentence = sentence.map(function(item, index) {
    return (
      <Word 
        key={index}
        index={index}
        onTap={onWordClick.bind(this, item.type, index) }/>
    )
  });

  return (
          <View style={styles.sentenceContainer}>
            <SortableGrid 
              style={styles.draggableSentence}
              itemsPerRow = {itemsPerRow}
              onDragRelease = { (result) => onWordDrag(result.itemOrder) }>
              { fullSentence }
            </SortableGrid>
          </View>
          
  );
};

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