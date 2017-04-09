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
import { setModal , clearSentence} from '../actions';
import { styles } from '../styles';

import NewWordModal from './NewWordModal';
import SentenceContainer from './SentenceContainer';
import WordsContainer from './WordsContainer';
import WordPicker from './WordPicker';

const NewSentence = ({ uri, wordPicker, setModalClick, clearSentenceClick }) => (
  <View style={styles.container}>
    <NewWordModal
      setModalClick={setModalClick} />
    <Image
      source={{uri: uri}}
      style={styles.image}
      resizeMode={Image.resizeMode.contain} />
    <SentenceContainer />
    { wordPicker ?
      <WordPicker /> :
      <WordsContainer
        setModalClick={setModalClick} />
    }
    <Button title = "Clear Sentence" 
            onPress = {() => clearSentenceClick()} />
  </View>
)

/* Container Component */

const mapDispatchToProps = (dispatch) => {
  return {
    setModalClick: (wordType) => {
      dispatch(setModal(wordType))
    }, 
    clearSentenceClick: () => {
      dispatch(clearSentence())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    uri: state.sentences.activeURI,
    wordPicker: state.sentences.wordPicker
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSentence)