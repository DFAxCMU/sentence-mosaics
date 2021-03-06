'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  Button,
  TouchableHighlight,
  Platform,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';

import { styles } from '../styles';

import Recorder from './Recorder.js';

import { addSentence } from '../actions/savedSentenceActions.js'

class RecordSentence extends React.Component {

    constructor(props) {
      super(props)
      this.sentenceString = ""
      var curr = ""
      var capitalizeNext = false
      var addSpace = true

      for (var i = 0; i < props.itemOrder.length; i++) {
        curr = props.sentence[props.itemOrder[i]].word
        if (curr) {
          if (i == 0 || capitalizeNext) {
            curr = curr[0].toUpperCase() + curr.slice(1);
          }

          capitalizeNext = (curr == "." || curr == "!" || curr == "?")

          addSpace = (props.sentence[props.itemOrder[i]].type != "punctuation" &&
                      props.sentence[props.itemOrder[i]].type != "inflection")

          if (addSpace) this.sentenceString = this.sentenceString.concat(" ");

          this.sentenceString = this.sentenceString.concat(curr);
          addSpace = true
        }
      }
    }

    render() {
        return (
            <View style={styles.container}>
              <Image
                source={{uri: this.props.image.uri}}
                style={styles.image}
                resizeMode="contain" />
              <View style={styles.sentenceContainer}>
                <Text style={styles.fullSentenceText}>{ this.sentenceString }</Text>
              </View>

                  <Recorder onRecorded={ (uri => {
                      this.recordingURI = uri
                  })}/>

              <TouchableHighlight
                  onPress={() => {
                      if (this.sentenceString == "") {
                        Alert.alert("This sentence is empty!");
                        return;
                      }
                      this.props.addSentence(this.props.index, this.sentenceString, this.recordingURI);
                      Alert.alert("Saved!");
                    }}
                  style={styles.button}
                  accessibilityLabel="Save Sentence Text">
                  <Text style={styles.wordText}>Save</Text>
              </TouchableHighlight>
            </View>
          )
    }
}

/* Container Component */

const mapDispatchToProps = {
  addSentence,
}
const mapStateToProps = (state) => {
  var index = state.currentSentence.activeImageIndex;
  return {
    image: state.images.byId[index],
    sentence: state.currentSentence.activeSentence,
    itemOrder: state.currentSentence.itemOrder,
    index,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordSentence)
