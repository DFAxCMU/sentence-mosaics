'use strict';

import React, { Component } from 'react';
import {
    StyleSheet
} from 'react-native';

var iPad = [768, 1024]; // width(x), height(y)
var iPhone6Simulator = [375, 667]
var currentDevice = iPhone6Simulator;
//var currentDevice = iPad;

// For iPhone
var wordBlankHeight = 40
var wordBlankWidth = 50
var wordBlankPaddingTop = 10

// For iPad
/*var wordBlankHeight = 60
var wordBlankWidth = 80
var wordBlankPaddingTop = 20*/

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
    height: 110,
    margin: 5,
    backgroundColor: '#e4eeed',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    padding: 10,
    width: currentDevice[0] * 7/8,
  },
  word: {
    height: wordBlankHeight,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: /*10,*/ 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    minWidth: wordBlankWidth,
    textAlign: 'center',
  },
  blankWord: {
    height: wordBlankHeight,
    width: wordBlankWidth,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  wordsScrollContainer: {
    backgroundColor: '#a7d2c8',
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
  wordsPicker: {
    height: 200,
    width: 325,
    margin: 5,
    backgroundColor: '#a7d2c8',
    padding: 10,
    flex: 1,
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
    height: wordBlankHeight,
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