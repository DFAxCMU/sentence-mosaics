'use strict'

import React, { Component } from 'react'
import {
  View,
  Image,
  Button,
  TouchableHighlight,
  ListView
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { selectPhoto } from '../actions'
import { styles } from '../styles'

/* Hardcoded Images for Photo Gallery */

import Realm from 'realm'
let realm = new Realm({
  schema: [{name: 'Photos', properties: {uri: 'string'}}]
})
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
var all_images = ds.cloneWithRows(['https://pbs.twimg.com/profile_images/428316729220276224/EdBZ2Kgp.jpeg', 'https://pulsations.files.wordpress.com/2010/05/randomdog.jpg', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/50766a43945145.5607608f5d3b5.jpg', 'https://alpha.wallhaven.cc/wallpapers/thumb/small/th-439774.jpg'])

const Home = ({ onPhotoClick }) => (
  <View style={styles.container}>
    <ListView contentContainerStyle={styles.list}
      dataSource={all_images}
      renderRow={(rowData) =>
        <TouchableHighlight
          underlayColor='transparent'
          onPress={onPhotoClick.bind(this, rowData)} >
        <Image
          style={styles.item}
          resizeMode='cover'
          source={{uri: rowData}} />
        </TouchableHighlight>
      } />
    <Button title="Import Photos"
            accessibilityLabel="Import New Photos" />
    <Button title="Take Photo"
            accessibilityLabel="Take a New Photo" />
  </View>
)

/* Container Component */

const mapDispatchToProps = (dispatch) => {
  return {
    onPhotoClick: (uri) => {
      dispatch(selectPhoto(uri))
      Actions.newSentence()
    }
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)