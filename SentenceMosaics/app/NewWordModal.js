'use strict';

import React, { Component } from 'react';
import {
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';

export default class NewWordModal extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  _updateInput(text) {
    this.setState({
      input: text,
    })
  }

  _submitWord(wordType) {
    if (this.state.input.length > 0) {
      this.props.addWord(this.state.input, wordType);
    }
    this._updateInput('');
    this.props.setModal(false);
  }

  render() {
    return (
      <View>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.props.modalVisible}
          >
         <View style={styles.modalContainer}>

         <TouchableHighlight onPress={() => {
              this.props.setModal(false)
            }}>
              <Text>Hide Me</Text>
          </TouchableHighlight>

          <View>
            <Text style={styles.header}>Type your {this.props.modalType}</Text>
          </View>

          <TextInput
              value={this.state.input}
              onChangeText={(text) => this._updateInput(text)}
              style={styles.input}
              placeholder={'Type ' + this.props.modalType + ' here!'} />

          <TouchableHighlight
            onPress={() => this._submitWord(this.props.modalType)}>
              <Text>Enter</Text>
          </TouchableHighlight>

         </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    padding: 50,
    backgroundColor: 'white',
    marginTop: 300,
    marginLeft: 30,
    marginRight: 30,
    height: 300,
  },
  input: {
    height: 60,
    padding: 10,
    borderWidth: 1,
    marginBottom: 30,
  },
  header: {
    fontSize: 20,
    marginBottom: 30,
    marginTop: 30,
  }
})