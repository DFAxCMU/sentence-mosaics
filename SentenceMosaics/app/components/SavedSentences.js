'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TouchableHighlight,
  ListView,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../styles';

class SentenceView extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.uri.sentence_strings),
    };
  }

  render() {
    var sentenceTextStyle = ([
      styles.wordText,
      { paddingBottom: 20}
    ]);
    return (
      <ListView
        style={{paddingTop:10}}
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => 
          <Text style={sentenceTextStyle}>{rowData}</Text>}
      />
    );
  }
}

const SavedSentences = ({ uri }) => (
  <View style={styles.container}>
      <Image
      source={{uri: uri.image}}
      style={styles.image}
      resizeMode={Image.resizeMode.contain} />
    <SentenceView
        uri={uri}
        />
  </View>
)

/* Container Component */

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = (state) => {
  return {
        uri: state.sentences.activeURI,
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedSentences)