'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';

import { styles } from '../styles';

const RecordSentence = ({ uri, sentence }) => {
  var fullSentence = sentence.map(function(item, index) {
    return (
      <Text>{item.word} </Text>
    )
  });

  return (
    <View style={styles.container}>
      <Image
        source={{uri: uri}}
        style={styles.image}
        resize='contain' />
      <View style={styles.sentenceContainer}>
        <Text style={styles.modalHeader}>{ fullSentence }</Text>
      </View>
    </View>
  )
}

/* Container Component */

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = (state) => {
  return {
    uri: state.sentences.activeURI,
    sentence: state.sentences.activeSentence,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordSentence)