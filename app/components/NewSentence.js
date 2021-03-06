'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TouchableHighlight,
} from 'react-native';

import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { 
  clearSentence, 
  clearWordPicker, 
  takeScreenshot
} from '../actions';
import { styles } from '../styles';

import NewWordModal from './NewWordModal';
import SentenceContainer from './SentenceContainer';
import WordsContainer from './WordsContainer';
import WordPicker from './WordPicker';

const NewSentence = ({ uri, wordPicker, clearSentenceClick, takeScreenshotClick }) => (
  <View style={styles.lightContainer}>

    <View style={styles.topContainer}>
        <NewWordModal />
        <Image
          source={{uri: uri}}
          style={styles.image}
          resizeMode="contain" />
        <SentenceContainer />
        { wordPicker ?
          <WordPicker /> :
          <WordsContainer />
        }
    </View>

    <View style={styles.bottomContainer}>
        <TouchableHighlight
          onPress={ Actions.info }
          style={styles.smallIconButton}>
          <Icon name="ios-information-circle-outline" style={styles.icon}> </Icon>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => clearSentenceClick()}
          style={styles.button}
          accessibilityLabel="Clear Sentence">
          <Text style={styles.wordText}>Clear Sentence</Text>
        </TouchableHighlight>

        {/* <TouchableHighlight
          onPress={() => takeScreenshotClick()}
          style={styles.button}
          accessibilityLabel="Take Screenshot">
          <Text style={styles.wordText}>Take Screenshot</Text>
        </TouchableHighlight> */}

        <TouchableHighlight
          onPress={ Actions.help }
          style={styles.smallIconButton}>
          <Icon name="ios-help-circle-outline" style={styles.icon}> </Icon>
        </TouchableHighlight>
    </View>



  </View>
)

/* Container Component */

const mapDispatchToProps = (dispatch) => {
  return {
    clearSentenceClick: () => {
      dispatch(clearSentence())
      dispatch(clearWordPicker())
    }, 
    takeScreenshotClick: () => {
      dispatch(takeScreenshot())
    }
  }
}

const mapStateToProps = (state, props) => {
  var index = props.index;
  var image = state.images.byId[index];
  return {
    uri: image.uri,
    wordPicker: state.currentSentence.wordPicker
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSentence)
