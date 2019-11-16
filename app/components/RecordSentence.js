'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  Button,
  TouchableHighlight,
  Platform,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';

import { styles } from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Audio } from 'expo-av';

import RecordButton from './RecordButton'
import ActionButtons from './ActionButtons'
import IconButton from './IconButton'
import * as Permissions from 'expo-permissions';

import { add_sentence } from '../actions'

class Recorder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRecording: false,
      isPlaying: false,
      isPaused: false,
    }
    this.timer = null
  }

  record = () => {
    const { isPlaying } = this.state
    if (isPlaying) {
      this.stopPlaying()
    }
    this.setState({ isRecording: true })
    this.recording = new Audio.Recording()
    Permissions.askAsync(Permissions.AUDIO_RECORDING)
      .then(() => {
        return Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          playsInSilentLockedModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: false,
          staysActiveInBackground: true,
        });
      }).then(() => {
        return this.recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY)
      })
      .then(status => {
        console.log("")
        return this.recording.startAsync()
      })
  }

  stopRecording = () => {
    const { isRecording } = this.state
    if (!isRecording) return

    this.recording.stopAndUnloadAsync()
      .then(status => {
        this.setState({ isRecording: false })

      })
  }

  startPlaying = () => {
    if (this.recording === null) return;
    if (this.state.isPaused) {
      this.setState({ isPlaying: true, isPaused: false})
      //this.sound.play
      //return
    }
    this.recording.createNewLoadedSoundAsync().then(({ sound }) => {
      this.setState({ isPlaying: true, isPaused: false })
      this.sound = sound
      return Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        playsInSilentLockedModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,      });

    }).then(()=> {
      console.log("starting...");
      this.sound.playAsync()
      this.sound.setOnPlaybackStatusUpdate(status => {
        if(status.didJustFinish) {
          this.stopPlaying();
        }
      })

    })
    this.setState({isPlaying: true})
  }

  pausePlaying = () => {
    this.setState({isPaused: true, isPlaying: false})
    this.sound.pauseAsync();
  }

  stopPlaying = () => {
    this.setState({isPlaying: false})
    this.sound.stopAsync();
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
        style={{marginTop: 20, flex: 1}}
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
            isDisabled={isRecording}
            onPressHandler={playPauseHandler} />
        </View>
      </ScrollView>
    )
  }
}

const RecordSentence = ({ uri, sentence, itemOrder, add_sentence, index }) => {
  var sentenceString = ""
  var curr = ""
  var capitalizeNext = false
  var addSpace = true

  for (var i = 0; i < itemOrder.length; i++) {
    curr = sentence[itemOrder[i]].word
    if (curr) {

      if (i == 0 || capitalizeNext) {
        curr = curr[0].toUpperCase() + curr.slice(1);
      }

      capitalizeNext = (curr == "." || curr == "!" || curr == "?")

      addSpace = (sentence[itemOrder[i]].type != "punctuation" &&
                  sentence[itemOrder[i]].type != "inflection")

      if (addSpace) sentenceString = sentenceString.concat(" ");

      sentenceString = sentenceString.concat(curr);
      addSpace = true
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{uri: uri.image}}
        style={styles.image}
        resizeMode="contain" />
      <View style={styles.sentenceContainer}>
        <Text style={styles.fullSentenceText}>{ sentenceString }</Text>
      </View>

      <TouchableHighlight
          onPress={() => {
              if (sentenceString == "") {
                Alert.alert("This sentence is empty!");
                return;
              }
              add_sentence(index, sentenceString);
              Alert.alert("Saved!");
            }}
          style={styles.button}
          accessibilityLabel="Save Sentence Text">
          <Text style={styles.wordText}>Save Sentence Text</Text>
      </TouchableHighlight>

      <Recorder/>
    </View>
  )
}

/* Container Component */

const mapDispatchToProps = (dispatch) => {
return {
      add_sentence: (image_index, sentence) => {
        dispatch(add_sentence(image_index,sentence));
      }
  }
}

const mapStateToProps = (state) => {
  var index = state.sentences.activeImageIndex;
  var correct_image = state.images.image_list[index];
  return {
    uri: correct_image,
    sentence: state.sentences.activeSentence,
    itemOrder: state.sentences.itemOrder,
    index,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordSentence)
