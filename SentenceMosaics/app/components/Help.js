'use strict';

import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
} from 'react-native';
import { styles } from '../styles';
import { connect } from 'react-redux';
import  Question  from './Question';


const Help = ({ uri,sentences,remove_sentence }) => (
  <View style={styles.container}>

  <ScrollView style={{margin: 20}} >
    <Text style={{ fontSize: 48 }}>Frequently Asked Questions</Text>
    <Question 
        question="How do I delete an image?"
        answer="Double tap an image to delete it."/>
    <Question 
        question="How do I create a sentence for an image?"
        answer="Tap on an image for the option to create a new sentence for it."/>
    <Question 
        question="How do I add words to my sentence?"
        answer="Click on a part of speech card to add an empty card to the end of the sentence."/>
    <Question 
        question="How do choose values for a word that I have added to my sentence?"
        answer="Click on the empty card that appears in the sentence."/>
    <Question 
        question="How do I delete a word that I added to the sentence?"
        answer="Double tap the word to delete it."/>
    <Question 
        question="How do I rearrange words in the sentence?"
        answer="Long press a word in the sentence to move the word."/>
  </ScrollView>

  </View>
)

/* Container Component */

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Help)