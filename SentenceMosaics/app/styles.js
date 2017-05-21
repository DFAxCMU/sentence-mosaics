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
    fontSize: wordFontSize
  },
  image: { // Enlarged photo in the New Sentence page
    margin: 10,
    height: currentDevice[0] * 2/3, // Height is smaller to make room
                                    // for the sentence and word bank,
                                    // but the image is still scaled
    width: currentDevice[0] * 7/8,
  },
  sentenceContainer: {
    backgroundColor: '#e4eeed',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    margin: 5,
    paddingLeft: 10,
    width: currentDevice[0] * 7/8,
  },
  sentenceScrollContainer: {
    minHeight: globalWordHeight + 10 + 10,
    maxHeight: (currentDevice[1] - (currentDevice[0] * 2/3)) / 2,
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
    height: globalWordHeight,
    borderRadius: 8,
    // width is set by the SortableGrid library based on itemsPerRow
  },
  wordText: {
    fontSize: wordFontSize,
  },
  fullSentenceText: {
    paddingBottom: 20,
    paddingTop: 20,
    fontSize: 2 * wordFontSize,
  },
  blankWord: {
    height: globalWordHeight,
    borderWidth: 1,
    marginTop: 10,
    marginRight: 10,
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
  wordPickerScrollContainer: {
    backgroundColor: '#c7e5e1',
    height: 200,
    margin: 5,
    width: currentDevice[0] * 7/8,
  },
  wordPickerContainer: {
    backgroundColor: '#e4eeed',
    padding: 10,
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
    height: globalWordHeight,
    minWidth: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop:5,
    paddingBottom: 5,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 8,
  },
  typeContainer: {
    height: globalWordHeight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  modalHeader: {
    paddingBottom: 20,
    paddingTop: 0,
    fontSize: 40,
  },
  modalButton: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#e4e319',
    paddingTop:10,
    paddingBottom:10,
    width: 135,
    fontSize: 40
  },
  closeModal: {
    textAlign: 'right',
    paddingTop: 0,
    paddingRight: 15,
    paddingBottom: 0,
    fontSize: 80,
  },
  button: {
    backgroundColor: '#e4eeed',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 8,
    minWidth: 200,
  },
});