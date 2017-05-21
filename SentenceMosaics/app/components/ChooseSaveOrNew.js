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
import { styles } from '../styles';

import { Actions } from 'react-native-router-flux'
import { selectPhoto, showDefaultSentence, clearWordPicker} from '../actions'

const ChooseSaveOrNew = ({ uri }) => (
  <View style={styles.container}>
    <Image
      source={{uri: uri.image}}
      style={styles.image}
      resizeMode={Image.resizeMode.contain} />

    <TouchableHighlight
        onPress={() => { 
          selectPhoto(uri)
          Actions.newSentence()
          showDefaultSentence()
          clearWordPicker()
        } }
        style={[styles.button, {minWidth: 300}]}
        accessibilityLabel="New Sentence">
        <Text style={styles.wordText}>New Sentence</Text>
    </TouchableHighlight>

    <TouchableHighlight
        onPress={() => { Actions.savedSentences()}}
        style={[styles.button, {minWidth: 300}]}
        accessibilityLabel="Saved Sentences">
        <Text style={styles.wordText}>Saved Sentences</Text>
    </TouchableHighlight>

  </View>
)

/* Container Component */

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = (state) => {
  var index = state.sentences.activeImageIndex;
  var correct_image = state.images.image_list[index];
  return {
    uri: correct_image,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChooseSaveOrNew)