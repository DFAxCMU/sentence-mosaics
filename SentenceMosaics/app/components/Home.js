'use strict'

import React, { Component } from 'react'
import {
  View,
  Image,
  Button,
  Text,
  TouchableHighlight,
  ListView,
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'
import Dropdown from 'react-native-modal-dropdown';

import {
  importImage,
  handlePhotoTap,
  handleSetFolder,
} from '../actions/homeActions';

import { styles } from '../styles'

class Home extends Component  {
  render() {
    let options = this.props.folderList.slice();
    let label = this.props.folder;
    if (!label) label = "Select Folder...";
    
    return (
      <View style={styles.lightContainer}>
        <Dropdown onSelect={i => {
            this.props.handleSetFolder(options[i])
          }} 
          animated={false} 
          defaultValue={label}
          options={options}
          style={styles.dropdownButton}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownOptions}
          dropdownTextStyle={styles.dropdownOptionsText}
          />

        <View style={styles.topContainer}>
          <ListView contentContainerStyle={styles.list}
            enableEmptySections={true}
            dataSource={this.props.ds}
            pageSize={9} // Needs to be a multiple of the number of
            // cells per row or else they will be gaps
            // when the rows are loaded
            renderRow={(rowData, sectionID, rowID, highlightRow) =>
                <TouchableHighlight
                  underlayColor='transparent'
                  onPress={ () => this.props.handlePhotoTap(rowID) }>
                  <Image
                    style={styles.item}
                    resizeMode='cover'
                    source={{uri: rowData.image}} />
                </TouchableHighlight>
            } />    

        </View>

        <View style={styles.bottomContainer}>

            <TouchableHighlight
                onPress={ Actions.info }
                style={styles.smallIconButton}>
                <Icon name="ios-information-circle-outline" style={styles.icon}> </Icon>
            </TouchableHighlight>

            <TouchableHighlight
                onPress={() => this.props.importImage(this.props.folder) }
                  style={styles.button}
                  accessibilityLabel="Import Photos">
                <Text style={styles.wordText}>Import Photos</Text>
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
} 

const mapStateToProps = (state) => {
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  ds.removeClippedSubviews = false;
  var filtered_images = state.images.image_list.filter(image => image.folder === state.images.folder);
  var images = ds.cloneWithRows(filtered_images);
  return {
    "ds": images, 
    "folder": state.images.folder,
    "folderList": state.images.folder_list,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
