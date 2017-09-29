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

const NewWordModal = ({ modalType, wordIndex, setModalClick, inputWord, onWordInput, handleSubmit }) => {
  if (modalType) {
    return (
      <View>
        <Modal
          //animationType={'fade'} // Was slow and annoying 
                                   // but consider putting back later
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
              autoCapitalize="none"
              onChangeText={onWordInput.bind(this)}
              style={styles.modalInput}
              autoFocus = {true}
              onSubmitEditing={handleSubmit.bind(this, inputWord, wordIndex)}
              placeholder={'Type ' + modalType + ' here!'} />

            <TouchableHighlight
              onPress={handleSubmit.bind(this, inputWord, wordIndex)}
              style={styles.modalButton}
              underlayColor='transparent'>
                <Text style={styles.modalButtonText}>Enter</Text>
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
    handleSubmit: (word, wordIndex) => {
      dispatch(editWord(word, wordIndex));
      dispatch(inputWord(''));
      dispatch(setModal(null));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    modalType: state.sentences.modalType,
    wordIndex: state.sentences.editIndex,
    inputWord: state.sentences.inputWord
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewWordModal)