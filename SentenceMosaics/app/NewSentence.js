'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import WordsContainer from './WordsContainer';
import SentenceContainer from './SentenceContainer';
import NewWordModal from './NewWordModal';

export default class NewSentence extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      modalType: 'noun',
      sentence: [],
    };
  }

  _setModal(visible, wordType='') {
    this.setState({
      modalVisible: visible,
      modalType: wordType,
    })
  }

  _addWord(word, type) {
    this.setState({
      sentence: this.state.sentence.concat([{word: word, type: type}]),
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <NewWordModal
          modalVisible={this.state.modalVisible}
          addWord={this._addWord.bind(this)}
          modalType={this.state.modalType}
          setModal={this._setModal.bind(this)} />
        <Image
          source={{uri: this.props.uri}}
          style={styles.image}
          resize='contain' />
        <SentenceContainer sentence={this.state.sentence} />
        <WordsContainer setModal={this._setModal.bind(this)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    margin: 10,
    height: 300,
    width: 400,
  }
});