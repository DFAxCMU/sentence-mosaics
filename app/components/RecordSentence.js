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
import ProgressBar from './ProgressBar'
import * as Permissions from 'expo-permissions';

import { addSentence } from '../actions/savedSentenceActions.js'

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
    const { isPlaying, isRecording } = this.state
    if (isPlaying) {
      this.stopPlaying()
    }
    if (isRecording) {
      this.stopRecording()
      return
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
        this.props.onRecorded(this.recording.getURI())
      })
  }

  startPlaying = () => {
    if (!this.recording) return;
    if (this.state.isPaused) {
      this.setState({ isPlaying: true, isPaused: false})
      this.sound.playAsync()
      return
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
            iconName={playPauseIcon}
            isDisabled={isRecording}
            onPressHandler={playPauseHandler} />
	  <ProgressBar progressVal={0.50}/>
        </View>
      </ScrollView>
    )
  }
}
/* old stop button:
          <IconButton
            iconName='stop'
            isDisabled={isFinishRecorded || !isRecording}
            onPressHandler={this.stopRecording} />
*/

class RecordSentence extends React.Component {

    constructor(props) {
      super(props)
      this.sentenceString = ""
      var curr = ""
      var capitalizeNext = false
      var addSpace = true

      for (var i = 0; i < props.itemOrder.length; i++) {
        curr = props.sentence[props.itemOrder[i]].word
        if (curr) {
          if (i == 0 || capitalizeNext) {
            curr = curr[0].toUpperCase() + curr.slice(1);
          }

          capitalizeNext = (curr == "." || curr == "!" || curr == "?")

          addSpace = (props.sentence[props.itemOrder[i]].type != "punctuation" &&
                      props.sentence[props.itemOrder[i]].type != "inflection")

          if (addSpace) this.sentenceString = this.sentenceString.concat(" ");

          this.sentenceString = this.sentenceString.concat(curr);
          addSpace = true
        }
      }
    }

    render() {
        return (
            <View style={styles.container}>
              <Image
                source={{uri: this.props.uri}}
                style={styles.image}
                resizeMode="contain" />
              <View style={styles.sentenceContainer}>
                <Text style={styles.fullSentenceText}>{ this.sentenceString }</Text>
              </View>

                  <Recorder onRecorded={ (uri => {
                      this.recordingURI = uri
                  })}/>

              <TouchableHighlight
                  onPress={() => {
                      if (this.sentenceString == "") {
                        Alert.alert("This sentence is empty!");
                        return;
                      }
                      this.props.addSentence(this.props.index, this.sentenceString, this.recordingURI);
                      Alert.alert("Saved!");
                    }}
                  style={styles.button}
                  accessibilityLabel="Save Sentence Text">
                  <Text style={styles.wordText}>Save</Text>
              </TouchableHighlight>
            </View>
          )
    }
}

/* Container Component */

const mapDispatchToProps = {
  addSentence,
}
const mapStateToProps = (state) => {
  var index = state.sentences.activeImageIndex;
  var image = state.images.byId[index];
  return {
    uri: image.uri,
    sentence: state.currentSentence.activeSentence,
    itemOrder: state.currentSentence.itemOrder,
    index,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordSentence)
