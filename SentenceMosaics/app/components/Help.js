'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { styles } from '../styles';
import { connect } from 'react-redux';
import  Question  from './Question';


const Help = ({ uri,sentences,remove_sentence }) => (
  <View style={styles.container}>

  <View style={{margin: 20}} >
    <Text style={{ fontSize: 48 }}>Frequently Asked Questions</Text>
    <Question 
        question="How do I delete images?"
        answer="Double tap!"/>
    <Question 
        question="How do I delete words I have selected?"
        answer="Double tap!"/>
    <Question 
        question="How do choose values for a word that I have added to my sentence?"
        answer="Click the colored bubble that appears after you chose a part of speech"/>
    <Question 
        question="How do I play audio for a sentence that I saved?"
        answer="Currently we do not support saving audio."/>

  </View>

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