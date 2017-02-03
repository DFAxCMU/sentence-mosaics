'use strict';

import React, { Component } from 'react';
import NewSentence from './NewSentence';
import {
  View,
  Image,
  Button,
  Text,
  StyleSheet,
  TouchableHighlight,
  ListView
} from 'react-native';
import Realm from 'realm';

let realm = new Realm({
  schema: [{name: 'Photos', properties: {uri: 'string'}}]
});

export default class Home extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['https://pbs.twimg.com/profile_images/428316729220276224/EdBZ2Kgp.jpeg', 'https://pulsations.files.wordpress.com/2010/05/randomdog.jpg', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/50766a43945145.5607608f5d3b5.jpg', 'https://alpha.wallhaven.cc/wallpapers/thumb/small/th-439774.jpg']),
    };
  }

  _navigate(uri) {
    this.props.navigator.push({
      name: 'NewSentence',
      passProps: {
        uri: uri
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <TouchableHighlight
              underlayColor='transparent'
              onPress={() => this._navigate(rowData) }>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    marginRight: 10,
    marginTop: 10,
    width: 240,
    height: 240
  }
});