'use strict'

import React, { Component } from 'react'
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableHighlight,
  FlatList
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'
import Dropdown from 'react-native-modal-dropdown';
import * as ImagePicker from 'expo-image-picker';
//import { Alert } from 'expo';
import * as Permissions from 'expo-permissions';

import {
  handlePhotoTap,
  handleSetFolder,
  takePicture
} from '../actions/homeActions';

import {
  addImage
} from '../actions/imageActions.js';

import { styles } from '../styles'

class Home extends Component  {
  render() {
    let options = this.props.folderList.slice();
    let label = this.props.folder;
    if (!label) label = "Select Folder...";
    console.log(this.props)
    return (
      <View style={styles.lightContainer}>
        <Dropdown onSelect={i => {
            this.props.handleSetFolder(options[i])
          }} 
          animated={true} 
          defaultValue={label}
          options={options}
          style={styles.dropdownButton}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownOptions}
          dropdownTextStyle={styles.dropdownOptionsText}
          />

        <View style={styles.topContainer}>
          <FlatList numColumns = {4}
            enableEmptySections={true}
            data = {this.props.images}
            pageSize={9} // Needs to be a multiple of the number of
            // cells per row or else they will be gaps
            // when the rows are loaded
            renderItem={ ({ item }) => {
                return <TouchableHighlight
                  underlayColor='transparent'
                  onPress={ () => {
                    this.props.handlePhotoTap(item.id) 
                  }}>
                  <ImageBackground
                    style={styles.item}
                    resizeMode='cover'
                    source={{uri: item.uri }}
                    backgroundColor = 'gray' />
                </TouchableHighlight>}
            } />    

        </View>

        <View style={styles.bottomContainer}>

            <TouchableHighlight
                onPress={ Actions.info }
                style={styles.smallIconButton}>
                <Icon name="ios-information-circle-outline" style={styles.icon}> </Icon>
            </TouchableHighlight>

            <TouchableHighlight
                onPress={ this.props.takePicture }
                style={styles.smallIconButton}>
                <Icon name="ios-camera" style={styles.icon}> </Icon>
            </TouchableHighlight>
            <TouchableHighlight
                onPress={ this.importImage.bind(this) }
                style={styles.smallIconButton}>
                <Icon name="md-photos" style={styles.icon}> </Icon>
            </TouchableHighlight>

            <TouchableHighlight
                onPress={ Actions.help }
                style={styles.smallIconButton}>
                <Icon name="ios-help-circle-outline" style={styles.icon}> </Icon>
            </TouchableHighlight>
        </View>


        </View>
    );
  }

  importImage() {
    Permissions.askAsync(Permissions.CAMERA_ROLL)
      .then(response => {
        if(response.status === 'granted') {
          return ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
          })
        }
        else {
          throw "Error"
        }
      }).then(response => {
        if(response.uri) {
          console.log(response.uri)
          this.props.addImage(response.uri)
        }
      }).catch(error => {
        console.log(error)
      })
  }
  takePicture() {
    Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
      .then(response => {
        if(response.status === 'granted') {
          return ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
          })
        }
        else {
          throw "Error"
        }
      }).then(response => {
        return CameraRoll.saveToCameraRoll(response.uri)
      }).then(uri => {
        if(uri) {
          this.props.addImage(uri)
        }
      }).catch(error => {
        console.log(error)
      })
  }
}

const mapDispatchToProps = {
  addImage,
  handlePhotoTap,
  handleSetFolder,
  takePicture
} 

const mapStateToProps = (state) => {
  return {
    images: state.images.allIds.map(id => ({ ...state.images.byId[id], id })),
    folder: state.images.currentFolder,
    folderList: state.images.folders,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
