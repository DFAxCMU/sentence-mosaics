'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Platform,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';

import { styles } from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AudioUtils } from 'react-native-audio-player-recorder'
import { 
  AudioPlayer, 
  AudioRecorder, 
} from 'react-native-audio-player-recorder'

import RecordButton from './RecordButton'
import ActionButtons from './ActionButtons'
import IconButton from './IconButton'

const Constants = {
  MAX_AUDIO_LENGTH: 60,
  AUDIO_PATH: AudioUtils.DocumentDirectoryPath + '/example.aac',
  CUSTOM_RED: '#f22335',
  ICON_GREY_COLOR: '#6b6b6b',
}

class Recorder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRecording: false,
      isFinishRecorded: false,
      isPlaying: false,
      isPaused: false,
      currentTime: 0,
      audioLength: 0
    }
    this.timer = null
  }

  prepareRecordingPath(){
    AudioRecorder.prepareRecordingAtPath(Constants.AUDIO_PATH, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000
    })
  }

  record = () => {
    const { isPlaying } = this.state
    if (isPlaying) {
      this.stopPlaying()
    }

    this.prepareRecordingPath()
    AudioRecorder.startRecording()
    this.setState({
      isPlaying: false,
      isRecording: true,
      isFinishRecorded: false,
      audioLength: 0,
      currentTime: 0
    })

    this.timer = setInterval(() => {
      const time = this.state.currentTime + 1
      this.setState({currentTime: time})
      if (time === Constants.MAX_AUDIO_LENGTH) {
        this.stopRecording()
      }
    }, 1000)
  }

  stopRecording = () => {
    const { isRecording } = this.state
    if (!isRecording) return

    AudioRecorder.stopRecording()
    this.setState({audioLength: this.state.currentTime + 1})
    clearInterval(this.timer)
    this.setState({ isRecording: false, isFinishRecorded: true, currentTime: 0})
  }

  startPlaying = () => {
    if (this.state.isPaused) {
      console.log("isPaused is true")
      AudioPlayer.unpause()      
      this.setState({isPlaying: true, isPaused: false})
      return
    }
    console.log("isPaused is false")
    AudioPlayer.play(Constants.AUDIO_PATH)
    this.setState({isPlaying: true})
  }

  pausePlaying = () => {
    AudioPlayer.pause()
    this.setState({isPaused: true, isPlaying: false})
  }

  stopPlaying() {
    AudioPlayer.stop()
    this.setState({isPlaying: false})
  }

  render() {
    const { 
      isRecording, 
      isFinishRecorded, 
      isPlaying, 
    } = this.state
    const playPauseIcon = isPlaying ? 'pause' : 'play'
    const playPauseHandler = isPlaying ? this.pausePlaying : this.startPlaying
    return (
      <ScrollView 
        style={{marginTop: 50, flex: 1}} 
        contentContainerStyle={{alignItems: 'center'}}>
        <RecordButton 
          isRecording={isRecording} 
          isFinishRecorded={isFinishRecorded}
          onPressHandler={this.record} />
        <View style={{
          flex: 1,
          flexDirection: 'row',
        }}>
          <IconButton 
            iconName='stop' 
            isDisabled={isFinishRecorded || !isRecording} 
            onPressHandler={this.stopRecording} />
          <IconButton 
            iconName={playPauseIcon}
            isDisabled={!isFinishRecorded || isRecording} 
            onPressHandler={playPauseHandler} />
        </View>
      </ScrollView>
    )
  }
}

const RecordSentence = ({ uri, sentence, itemOrder }) => {
  var sentenceString = ""
  var curr = ""
  var capitalizeNext = false
  var addSpace = true

  for (var i = 0; i < itemOrder.length; i++) {
    curr = sentence[itemOrder[i]].word

    console.log("curr:")
    console.log(curr)

    if (capitalizeNext) {
      console.log("capitalizing:")
      console.log(curr)
      curr = curr[0].toUpperCase() + curr.slice(1);
      console.log(curr)
    }

    if (curr[0] == "-") {
      curr = curr.slice(1);
      addSpace = false
    }
    
    if (curr == "." || curr == "!" || curr == "?") {
      capitalizeNext = true
    } else {
      capitalizeNext = false
    }

    if (addSpace) {
      sentenceString = sentenceString.concat(" ");
    } 
    sentenceString = sentenceString.concat(curr);
    addSpace = true

  }

  //Save the sentence! 
  var current_id = uri.id;
  AsyncStorage.getItem("image_data").then((value) => {
        var image_data = JSON.parse(value);
        for (var i = 0; i < image_data.length; i++) {
          if (image_data[i].id == current_id) {
            image_data[i].sentence_strings.push(sentenceString);
          }
        }
        var json_images = JSON.stringify(image_data); 
        AsyncStorage.setItem("image_data", json_images);
  }).done();

  return (
    <View style={styles.container}>
      <Image
        source={{uri: uri.image}}
        style={styles.image}
        resizeMode={Image.resizeMode.contain} />
      <View style={styles.sentenceContainer}>
        <Text style={styles.fullSentenceText}>{ sentenceString }</Text>
      </View>
      <Recorder/>
    </View>
  )
}

/* Container Component */

const mapDispatchToProps = (dispatch) => {
  
  return {}
}

const mapStateToProps = (state) => {
  return {
    uri: state.sentences.activeURI,
    sentence: state.sentences.activeSentence,
    itemOrder: state.sentences.itemOrder,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordSentence)