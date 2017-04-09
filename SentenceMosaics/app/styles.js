'use strict';

import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet
} from 'react-native';

// Make global variable globalDeviceType for device type
var dim = Dimensions.get('window');
if (dim.width < 500) {
  global.globalDeviceType = 'iPhone'
} else {
  global.globalDeviceType = 'iPad'
}

if (globalDeviceType == 'iPad') { 
  global.globalWordHeight = 70;
  global.globalWordWidth = 80; 
  var wordFontSize = 20;
} 
else if (globalDeviceType == 'iPhone') {
  global.globalWordHeight = 50;
  global.globalWordWidth = 50;
  var wordFontSize = 11;
}

var currentDevice = [dim.width,dim.height];

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#c7e5e1',
    marginTop: 60,
  },
  page: {
    flex: 1,
  },
  nav: {
    backgroundColor: '#e4eeed',
  },
  header: {
    fontSize: 18,
    marginTop: 8
  },
  list: {
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
  },
  item: { // Photos cells in Home page
    marginRight: 10,
    marginTop: 10,
    width: currentDevice[0] / 4, 
    height: currentDevice[0] / 4,
  },
  modalContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 200,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  input: {
    height: 60,
    padding: 10,
    borderWidth: 1,
    marginBottom: 30,
  },
  image: { // Enlarged photo in the New Sentence page
    margin: 10,
    height: currentDevice[0] * 2/3, // Height is smaller to make room
                                    // for the sentence and word bank,
                                    // but the image is still scaled
    width: currentDevice[0] * 7/8,
  },
  sentenceContainer: {
    margin: 5,
    backgroundColor: '#e4eeed',
    paddingLeft: 10,
    width: currentDevice[0] * 7/8,
  },
  draggableSentence: { 
    width: currentDevice[0] * 7/8 - 10, // from 10 padding on left
    alignItems: 'center'
  },
  word: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    marginTop: 10,
  },
  wordText: {
    fontSize: wordFontSize,
  },
  blankWord: {
    height: globalWordHeight,
    width: globalWordWidth,
    borderWidth: 1,
    marginTop: 10,
    borderStyle: 'dashed',
  },
  wordsScrollContainer: {
    backgroundColor: '#c7e5e1',
    width: currentDevice[0] * 7/8,
    height: 200,
    margin: 5,
  },
  wordsContainer: {
    padding: 10,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    backgroundColor: '#e4eeed',
  },
  wordPickerContainer: {
    margin: 5,
    backgroundColor: '#e4eeed',
    alignItems: 'center',
    flexDirection:'column',
    padding: 10,
    width: currentDevice[0] * 7/8,
  },
  wordPicker: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
  },
  categoryContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginBottom: 10,
  },
  categoryHeader: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  categoryWord: {
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop:5,
    paddingBottom: 5,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  typeContainer: {
    height: globalWordHeight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  modalHeader: {
    paddingBottom: 20,
    paddingTop: 20,
    fontSize: 18,
  },
  modalButton: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#e4e319',
    paddingTop:10,
    paddingBottom:10,
    width: 75,
  },
  closeModal: {
    textAlign: 'right',
    fontSize: 20,
  }
});