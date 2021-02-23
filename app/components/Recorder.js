import React, { Component } from 'react';

import {
  View,
  ScrollView,
} from 'react-native';

import RecordButton from './RecordButton'
import ActionButtons from './ActionButtons'
import IconButton from './IconButton'
import ProgressBar from './ProgressBar'
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class Recorder extends Component {
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
