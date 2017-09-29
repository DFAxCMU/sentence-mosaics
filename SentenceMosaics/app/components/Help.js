'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { styles } from '../styles';
import { connect } from 'react-redux';


const Help = ({ uri,sentences,remove_sentence }) => (
  <View style={styles.container}>
    <Text>Help screen!</Text>
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