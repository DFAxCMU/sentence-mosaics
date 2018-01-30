'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { clearSentence, clearWordPicker} from '../actions';
import { styles } from '../styles';

import NewWordModal from './NewWordModal';
import SentenceContainer from './SentenceContainer';
import WordsContainer from './WordsContainer';
import WordPicker from './WordPicker';

const NewSentence = ({ uri, wordPicker, clearSentenceClick }) => (
  <View style={styles.container}>
    <NewWordModal />
    <Image
      source={{uri: uri.image}}
      style={styles.image}
      resizeMode={Image.resizeMode.contain} />
    <SentenceContainer />
    { wordPicker ?
      <WordPicker /> :
      <WordsContainer />
    }

    <TouchableHighlight
        onPress={() => clearSentenceClick()}
        style={styles.button}
        accessibilityLabel="Clear Sentence">
        <Text style={styles.wordText}>Clear Sentence</Text>
    </TouchableHighlight>

  </View>
)

/* Container Component */

const mapDispatchToProps = (dispatch) => {
  return {
    clearSentenceClick: () => {
      dispatch(clearSentence())
      dispatch(clearWordPicker())
    }
  }
}

const mapStateToProps = (state, props) => {
  var index = props.index;
  var correct_image = state.images.image_list[index];
  return {
    uri: correct_image,
    wordPicker: state.sentences.wordPicker
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSentence)
