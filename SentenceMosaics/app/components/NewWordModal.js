'use strict';

import React, { Component } from 'react';
import {
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { editWord, inputWord, setModal } from '../actions';
import { styles } from '../styles';

const NewWordModal = ({ modalType, setModalClick, inputWord, onWordInput, handleSubmit }) => {
  if (modalType) {
    return (
      <View>
        <Modal
          animationType={'fade'}
          transparent={true}>
          <View style={styles.modalContainer}>
            <TouchableHighlight
              onPress={() => {setModalClick(null)}}
              underlayColor='transparent' >
                <Text style={styles.closeModal}>x</Text>
            </TouchableHighlight>

            <View>
              <Text style={styles.modalHeader}>Add new {modalType}</Text>
            </View>

            <TextInput
              value={inputWord}
              onChangeText={onWordInput.bind(this)}
              style={styles.input}
              placeholder={'Type ' + modalType + ' here!'} />

            <TouchableHighlight
              onPress={handleSubmit.bind(this, inputWord)}
              underlayColor='transparent'>
                <Text style={styles.modalButton}>Enter</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
  else return null;
}

/* Container Component */

const mapDispatchToProps = (dispatch) => {
  return {
    onWordInput: (word) => {
      dispatch(inputWord(word))
    },
    handleSubmit: (word) => {
      dispatch(editWord(word));
      dispatch(inputWord(''));
      dispatch(setModal(null));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    modalType: state.sentences.modalType,
    inputWord: state.sentences.inputWord
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewWordModal)