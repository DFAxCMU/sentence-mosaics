'use strict'

import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  FlatList
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'
import Dropdown from 'react-native-modal-dropdown';

import {
  importImage,
  handlePhotoTap,
  handleSetFolder,
  takePicture
} from '../actions/homeActions';

import { styles } from '../styles'

class Home extends Component  {
  render() {
    let options = this.props.folderList.slice();
    let label = this.props.folder;
    if (!label) label = "Select Folder...";
    console.log(this.props.filteredImages)
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
            data = {this.props.filteredImages}
            pageSize={9} // Needs to be a multiple of the number of
            // cells per row or else they will be gaps
            // when the rows are loaded
            renderItem={({ item, index }) => {
              console.log("kslf", item)
                return <TouchableHighlight
                  underlayColor='transparent'
                  onPress={ () => {
                    console.log("here", this.props.unfilteredImages);
                    this.props.handlePhotoTap(item.image_index) 
                  }}>
                  <Image
                    style={styles.item}
                    resizeMode='cover'
                    source={{uri: item.image}} />
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
/*<ListView contentContainerStyle={styles.list}
            enableEmptySections={true}
            dataSource={this.props.ds}
            pageSize={9} // Needs to be a multiple of the number of
            // cells per row or else they will be gaps
            // when the rows are loaded
            renderRow={(rowData, sectionID, rowID, highlightRow) =>
                <TouchableHighlight
                  underlayColor='transparent'
                  onPress={ () => {
                    console.log("here", this.props.unfilteredImages);
                    this.props.handlePhotoTap(rowData.image_index) 
                  }}>
                  <Image
                    style={styles.item}
                    resizeMode='cover'
                    source={{uri: rowData.image}} />
                </TouchableHighlight>
            } />    */
            /*
            renderRow={(rowData, sectionID, rowID, highlightRow) =>
              <TouchableHighlight
                underlayColor='transparent'
                onPress={ () => {
                  console.log("here", this.props.unfilteredImages);
                  this.props.handlePhotoTap(rowData.image_index) 
                }}>
                <Image
                  style={styles.item}
                  resizeMode='cover'
                  source={{uri: rowData.image}} />
              </TouchableHighlight>
          } />  */
