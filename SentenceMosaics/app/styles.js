'use strict';

import React, { Component } from 'react';
import {
    StyleSheet
} from 'react-native';

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
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
  },
  item: {
    marginRight: 10,
    marginTop: 10,
    width: 110,
    height: 110
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
  image: {
    margin: 10,
    height: 200,
    width: 325,
  },
  sentenceContainer: {
    height: 110,
    margin: 5,
    backgroundColor: '#f0f4f4',
    padding: 10,
    width: 325,
  },
  word: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    minWidth: 50,
    textAlign: 'center',
  },
  blankWord: {
    height: 40,
    width: 50,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  wordsScrollContainer: {
    backgroundColor: '#a7d2c8',
    width: 325,
    height: 200,
    margin: 5,
  },
  wordsContainer: {
    padding: 10,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
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
    height: 50,
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