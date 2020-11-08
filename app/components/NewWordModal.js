'use strict';

import React, { Component } from 'react';
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { editWord, inputWord, setModal } from '../actions';
import { styles } from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';

const NewWordModal = ({ modalType, wordIndex, inputWord, onWordInput, handleSubmit, closeModal }) => {
  if (modalType) {
    return (
        <Modal
          //animationType={'fade'} // Was slow and annoying 
                                   // but consider putting back later
          transparent={true}>
          <View style={styles.modalContainer}>

            <View style={styles.modalRow}>
          
              <Text style={styles.modalText}>Use custom {modalType}</Text>
              
              <TouchableOpacity
                onPress={() => {closeModal()}}>
                  <Icon name="ios-close" style={styles.closeModalButton}> </Icon>
              </TouchableOpacity>
            </View>

            <View style={styles.modalRow}>
              <TextInput
                value={inputWord}
                autoCapitalize="none"
                onChangeText={onWordInput.bind(this)}
                style={styles.modalInput}
                autoFocus = {true}
                onSubmitEditing={handleSubmit.bind(this, inputWord, wordIndex)}
                placeholder={'Type ' + modalType + ' here!'} />

              <TouchableOpacity
                onPress={handleSubmit.bind(this, inputWord, wordIndex)}
                style={styles.modalButton}>
                  <Text style={styles.modalText}>Enter</Text>
              </TouchableOpacity>
            </View>

          </View>
        </Modal>
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
    },
    closeModal: () => {
      dispatch(inputWord(''));
      dispatch(setModal(null));  
    }
  }
}

const mapStateToProps = (state) => {
  return {
    modalType: state.currentSentence.modalType,
    wordIndex: state.currentSentence.editIndex,
    inputWord: state.currentSentence.inputWord
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewWordModal)
