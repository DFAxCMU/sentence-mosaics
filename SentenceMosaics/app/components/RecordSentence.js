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

const RecordSentence = ({ uri, sentence, itemOrder }) => {
  var sentenceString = ""
  for (var i = 0; i < itemOrder.length; i++) {
    sentenceString = sentenceString.concat(sentence[itemOrder[i]].word).concat(" ");
  }

  return (
    <View style={styles.container}>
      <Image
        source={{uri: uri}}
        style={styles.image}
        resizeMode={Image.resizeMode.contain} />
      <View style={styles.sentenceContainer}>
        <Text style={styles.fullSentenceText}>{ sentenceString }</Text>
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
    itemOrder: state.sentences.itemOrder,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordSentence)