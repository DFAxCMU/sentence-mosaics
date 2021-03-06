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
import Dropdown from './Dropdown.js';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

import {
  handlePhotoTap,
  handleSetFolder,
} from '../actions/homeActions';

import {
  addImage
} from '../actions/imageActions.js';

import { setFolder } from '../actions/folderActions.js';

import { styles } from '../styles'

class Home extends Component  {
  render() {
    let options = this.props.folderList.map(x => { return { label: x, value: x } });
    let label = this.props.folder;
    if (!label) label = "Select Folder...";
    return (
      <View style={styles.lightContainer}>
        <DropDownPicker 
          searchable={true}

          items={ options } 
          defaultValue={ label } 
          containerStyle={{height: 40}} 
          onChangeItem={ item => {
            this.props.setFolder(item.value)
          }}
        />

        <View style={styles.topContainer}>
          <FlatList 
            numColumns={ 3 }
            data = {this.props.images}
            renderItem={({ item, index }) => {
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
            onPress={ this.takePicture.bind(this) }
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
        console.error(error)
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
        console.log(response.uri)
        return MediaLibrary.createAssetAsync(response.uri)
      }).then(asset => {
        console.log("this is the uri", asset)
        if(asset && asset.uri) {
          this.props.addImage(asset.uri)
        }
      }).catch(error => {
        console.error(error)
      })
  }
}

const mapDispatchToProps = {
  addImage,
  handlePhotoTap,
  setFolder,
} 

const mapStateToProps = (state) => {
  const currentFolder = state.images.currentFolder;
  return {
    images: state.images.allIds
      .map(id => ({ ...state.images.byId[id], id }))
      .filter(image => image.folder === currentFolder),
    folder: currentFolder,
    folderList: state.images.folders,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
