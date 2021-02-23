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
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';


import { removeSentence } from '../actions/savedSentenceActions.js'

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
    return (this.props.sentences.length == 0) ? 
      <Text style={styles.wordsHeader}>No Sentences Saved</Text>
      : (<FlatList
            style={{paddingTop:10, }}
            enableEmptySections={true}
            data = {this.props.sentences}
            renderItem={({ item, index }) => {
              return (
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style= {{marginRight: 10}}
                      onPress={ () => {
                        if(this.state.currentlyPlaying === index) {
                          this.setState({currentlyPlaying : null})
                        }
                        else {
                          this.setState({currentlyPlaying : index})
                          const sound = new Audio.Sound()
                          sound.loadAsync({ 
                            uri: item.recordingUri 
                          }).then(() => {
                            return Audio.setAudioModeAsync({
                              allowsRecordingIOS: false,
                              interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                              playsInSilentModeIOS: true,
                              playsInSilentLockedModeIOS: true,
                              shouldDuckAndroid: true,
                              interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                              playThroughEarpieceAndroid: false,
                              staysActiveInBackground: true,
                            })
                          }).then(()=> {
                            console.log("starting...");
                            sound.playAsync()
                            sound.setOnPlaybackStatusUpdate(status => {
                              if(status.didJustFinish) {
                                console.log('done');
                                sound.stopAsync();
                                this.setState({currentlyPlaying : null})
                              }
                            })
                          }).catch(error => {
                            console.error(error)
                          })
                        }
                    }}>
                      <Icon 
                        name={this.state.currentlyPlaying==index ? 'pause' : 'play'} 
                        size={24} 
                        color={'gray'} />
                    </TouchableOpacity>
                    <Text style={{fontSize: 24}}>{item.text}</Text>
                    
                    <Text style={{fontSize: 24, color: "red"}}
                      onPress={ () => {
                        Alert.alert(
                          'Delete Sentence?',
                          'Are you sure you want to delete this sentence?',
                          [
                              {text: 'Yes', onPress: () =>  {
                                  comp.props.removeSentence(item.id); 
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

const SavedSentences = ({ image,sentences,removeSentence }) => (
  <View style={styles.container}>
      <Image
      source={{uri: image.uri}}
      style={styles.image}
      resizeMode="contain" />
    <SentenceView
        uri={image}
        sentences={sentences}
        removeSentence={removeSentence}
        />
  </View>
)

/* Container Component */

const mapDispatchToProps = {
  removeSentence,
}

const mapStateToProps = (state) => {
  var index = state.currentSentence.activeImageIndex;
  var image = state.images.byId[index];
  const sentences = state.savedSentences.allIds
    .filter(id => state.savedSentences.byId[id].image === index) 
    .map(id => ({ ...state.savedSentences.byId[id], id }))
  return {
    sentences: sentences,  
    image: image
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedSentences)
