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
      let options = this.props.folderList.map(x => { return { label: x, value: x } });
    let label = this.props.folder;
    if (!label) label = "Select Folder...";
    console.log(this.props)
    return (
      <View style={styles.lightContainer}>
        <DropDownPicker 
            searchable={true}

          items={ options } 
          defaultValue={ label } 
          containerStyle={{height: 40}} 
          onChangeItem={ item => {
              this.props.handleSetFolder(item.value)
          }}
        />

        <View style={styles.topContainer}>
          <FlatList 
            numColumns={ 3 }
            data = {this.props.filteredImages}
            renderItem={({ item, index }) => {
                return <TouchableHighlight
                  underlayColor='transparent'
                  onPress={ () => {
                    this.props.handlePhotoTap(item.image_index) 
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
