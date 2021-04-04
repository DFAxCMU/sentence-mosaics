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
  global.globalWordHeight = 60; //70;
  global.globalWordWidth = 60;//80; 
  var wordFontSize = 16;
  //global.wordFontSize = 20;
} 
else if (globalDeviceType == 'iPhone') {
  global.globalWordHeight = 50;
  global.globalWordWidth = 50;
  var wordFontSize = 11;
  //global.wordFontSize = 11;
}

var currentDevice = [dim.width,dim.height];

const numOfCols = 4;
const spaceBetween = 10;

export const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    backgroundColor: '#c7e5e1',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#c7e5e1',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#c7e5e1',
  },
  bottomContainer: {
    display: 'flex',
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    maxHeight:80,
    height:80,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: '#c7e5e1',
    padding: 30,
  },
  page: {
    flex: 1,
  },
  list: {
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    padding: spaceBetween / 2,
  },
  item: { // Photos cells in Home page
    margin: spaceBetween / 2,
    width: (currentDevice[0] - (numOfCols + 1) * spaceBetween) / numOfCols, 
    aspectRatio: 1,
  },
  modalContainer: {
    flexDirection: "column",
    justifyContent: 'center',
    backgroundColor: 'white',
    alignSelf: "center",
    position: "absolute",
    top: currentDevice[0] * 3/5, // Covers the bottom of the image
    opacity: 0.95,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingTop: 10,
    minWidth: 350,
  },
  modalInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    fontSize: wordFontSize,
    marginRight: 10,
    minWidth: 200,
  },
  image: { // Enlarged photo in the New Sentence page
    margin: 10,
    height: currentDevice[0] * 2/3, // Height is smaller to make room
                                    // for the sentence and word bank,
                                    // but the image is still scaled
    width: currentDevice[0] * 7/8,
  },
  dropdownButton: {
    alignSelf: 'center',
    backgroundColor: '#448479',
    width: "80%",
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 10,
  },
  dropdownText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    margin: 10,
  },
  dropdownOptions: {
    alignSelf: 'center',
    width: "80%",
    borderRadius: 10,
  },
    dropdownOptionsText: {
    fontSize: 20,
    width: "50%"
  },
  sentenceContainer: {
    backgroundColor: '#f9fffe',
    shadowColor: '#a7d6cf',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1.0,
    shadowRadius: 6,
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
  wordsHeader: {
    fontSize: wordFontSize + 5,
    margin: 10,
    fontWeight: 'bold'
  },
  categoryContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingBottom: 15,
    marginBottom: 10,
  },
  categoryHeader: {
    fontSize: wordFontSize,
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
  modalRow: {
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalButton: {
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#4f933e', // darkish green
    paddingTop: 10,
    paddingBottom: 10,
    maxWidth: 135,
    borderRadius: 8,
  },
  modalText: {
    fontSize: wordFontSize,
  },
  closeModalButton: {
    fontSize: 50,
  },
  button: {
    backgroundColor: '#e4eeed',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 8,
    minWidth: 200,
    minHeight: 50
  },
  smallIconButton: {
    backgroundColor: '#e4eeed',
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 10,
    // margin: 20,
    padding: 10,
    margin: 20,
    marginTop: 10,
    borderRadius: 8,
    alignSelf: 'center',
    borderRadius: 8,
  },
  icon: {
    fontSize: 2 * wordFontSize,
    textAlign: 'center',
  },
  homeDrawer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 20,
  }
});
