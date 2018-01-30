'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { clearWordPicker, showDefaultSentence } from '../actions';
import { styles } from '../styles';

import { Actions } from 'react-native-router-flux'

class ChooseSaveOrNew extends Component {
  render() {
    return ( 
      <View style={styles.container}>
        <Image
          source={{uri: this.props.uri.image}}
          style={styles.image}
          resizeMode={Image.resizeMode.contain} />

        <TouchableHighlight
          onPress={() => this.props.newSentenceClick(this.props.index) }
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newSentenceClick: (index) => {
      dispatch(showDefaultSentence())
      dispatch(clearWordPicker())
      Actions.newSentence({ index: index })
    }
  }
}

const mapStateToProps = (state, props) => {
  var index = props.index;
  var image = state.images.image_list[index];
  return {
    uri: image,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChooseSaveOrNew)
