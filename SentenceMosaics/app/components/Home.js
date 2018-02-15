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

import {
  importImage,
  handlePhotoTap,
} from '../actions/homeActions';

import { styles } from '../styles'

class Home extends Component  {
  render() {
    return (
      <View style={styles.lightContainer}>
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
            onPress={ this.props.importImage }
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
} 

const mapStateToProps = (state) => {
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  ds.removeClippedSubviews = false;
  var images = ds.cloneWithRows(state.images.image_list);
  return {
    "ds": images, 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
