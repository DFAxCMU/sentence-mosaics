'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  Button,
  AsyncStorage,
  TouchableHighlight,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome'


import { remove_sentence } from '../actions'

class SentenceView extends Component {
  constructor(props){
    super(props)
    this.state = {currentlyPlaying: null}
  }

  render() {
    var sentenceTextStyle = ([
      styles.wordText,
      { paddingBottom: 20}
    ]);
    var comp = this; 
    console.log("saved sentences:" + JSON.stringify(this.props.sentences));
    return (this.props.sentences.length == 0) ? 
      <Text style={styles.wordsHeader}>No Sentences Saved</Text>
      : (<FlatList
            style={{paddingTop:10, }}
            enableEmptySections={true}
            data = {this.props.sentences}
            renderItem={({ item, index }) => {
              return(
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style= {{marginRight: 10}}
                    onPress={ () => {this.state.currentlyPlaying==index ? this.setState({currentlyPlaying : null}): 
                    this.setState({currentlyPlaying : index})}}>
      <Icon name={this.state.currentlyPlaying==index ? 'pause' : 'play'} size={24} color={'gray'} />

    </TouchableOpacity>
                    <Text style={{fontSize: 24}}>{item.text}</Text>
                    
                    <Text style={{fontSize: 24, color: "red"}}
                      onPress={ () => {
                        Alert.alert(
                          'Delete Sentence?',
                          'Are you sure you want to delete this sentence?',
                          [
                              {text: 'Yes', onPress: () =>  {
                                  comp.props.remove_sentence(item.id); 
                                }
                              , style: 'cancel'},
                              {text: 'No', onPress: () => console.log('No delete sentence')},
                          ]
                        )
                        }}
                    >       x</Text>
                    </View>
                );
              }}
        />
      );
  }
}

const SavedSentences = ({ uri,sentences,remove_sentence }) => (
  <View style={styles.container}>
      <Image
      source={{uri: uri.image}}
      style={styles.image}
      resizeMode="contain" />
    <SentenceView
        uri={uri}
        sentences={sentences}
        remove_sentence={remove_sentence}
        />
  </View>
)

/* Container Component */

const mapDispatchToProps = (dispatch) => {
  return {
      remove_sentence: (sentence_id) => {
        dispatch(remove_sentence(sentence_id));
      }
  }
}

const mapStateToProps = (state) => {
  var index = state.sentences.activeImageIndex;
  var correct_image = state.images.image_list[index];
  var sentences = [];
  for (var i=0; i < state.savedSentences.sentence_list.length; i++)
  {
    if (state.savedSentences.sentence_list[i].image_id === index)
    {
      sentences.push(state.savedSentences.sentence_list[i]);
    }
  }
  return {
    sentences: sentences, 
    uri: correct_image
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedSentences)
