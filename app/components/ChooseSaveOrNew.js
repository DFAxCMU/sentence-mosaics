'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { clearWordPicker, setModal, showDefaultSentence } from '../actions';
import { styles } from '../styles';

import { Actions } from 'react-native-router-flux'

class ChooseSaveOrNew extends Component {
  render() {
    return ( 
      <View style={styles.lightContainer}>
        <View style={styles.container}>
          <Image
            source={{uri: this.props.uri }}
            style={styles.image}
            resizeMode="contain" />

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
        <View style={styles.bottomContainer}>
          <TouchableHighlight
            onPress={ Actions.info }
            style={styles.smallIconButton}>
            <Icon name="ios-information-circle-outline" style={styles.icon}> </Icon>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={ Actions.help }
            style={styles.smallIconButton}>
            <Icon name="ios-help-circle-outline" style={styles.icon}> </Icon>
          </TouchableHighlight>
        </View>
      </View> 
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newSentenceClick: (index) => {
      dispatch(showDefaultSentence())
      dispatch(clearWordPicker())
      dispatch(setModal(null))
      Actions.newSentence({ index: index })
    }
  }
}

const mapStateToProps = (state, props) => {
  var index = props.index;
  var image = state.images.byId[index];
  return {
    uri: image.uri,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChooseSaveOrNew)
