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

import { setModal } from '../actions';
import { styles } from '../styles';

import NewWordModal from './NewWordModal';
import SentenceContainer from './SentenceContainer';
import WordsContainer from './WordsContainer';
import WordPicker from './WordPicker';

const NewSentence = ({ uri, wordPicker, setModalClick }) => (
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
  </View>
)

/* Container Component */

const mapDispatchToProps = (dispatch) => {
  return {
    setModalClick: (wordType) => {
      dispatch(setModal(wordType))
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