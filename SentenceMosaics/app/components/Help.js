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

if (global.globalDeviceType == 'iPad') {
  var headingSize = 48;
  var bodySize = 20;
} else { // iPhone
  var headingSize = 24;
  var bodySize = 14;
}

const Help = () => (
  <View style={styles.container}>

  <ScrollView style={{margin: 20}} >
    <Text style={{ fontSize: headingSize }}>Frequently Asked Questions</Text>
    <Question 
        question="How do I delete an image?"
        answer="Double tap an image to delete it."/>
    <Question 
        question="How do I create a sentence for an image?"
        answer="Tap on an image for the option to create a new sentence for it."/>
    <Question 
        question="How do I add a word to my sentence?"
        answer="Click on a card category to add an empty card to the end of the sentence. Then click the empty card to choose a word."/>
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