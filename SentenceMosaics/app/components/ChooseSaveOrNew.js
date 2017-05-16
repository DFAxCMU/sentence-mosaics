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
      <Button 
          title="new sentence"
          onPress={() => { 
            selectPhoto(uri)
            Actions.newSentence()
            showDefaultSentence()
            clearWordPicker()
          } }
          accessibilityLabel="Saved Sentences" />
      <Button 
          title="saved sentences"
          onPress={() => { Actions.savedSentences()}}
          accessibilityLabel="Saved Sentences" />
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