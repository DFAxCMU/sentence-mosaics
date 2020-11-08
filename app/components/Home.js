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
  importImage,
  handlePhotoTap,
  handleSetFolder,
  takePicture
} from '../actions/homeActions';

import { styles } from '../styles'

class Home extends Component  {
  render() {
      let options = this.props.folderList.map(x => { return { label: x, value: x } });
    let label = this.props.folder;
    if (!label) label = "Select Folder...";
    console.log(this.props.filteredImages)
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
                    source={{uri: item.image}}
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
                onPress={ this.props.importImage }
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
}

const mapDispatchToProps = {
  importImage,
  handlePhotoTap,
  handleSetFolder,
  takePicture
} 

const mapStateToProps = (state) => {
  var filtered_images = state.images.image_list.filter(image => image.folder === state.images.folder);
  return {
    "unfilteredImages": state.images.image_list,
    "folder": state.images.folder,
    "folderList": state.images.folder_list,
    'filteredImages': filtered_images
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
