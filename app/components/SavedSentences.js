'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  Button,
  AsyncStorage,
  TouchableHighlight,
  ListView,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../styles';

import { remove_sentence } from '../actions'

class SentenceView extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      uri: this.props.uri, 
      ds: ds, 
      dataSource: ds.cloneWithRows(this.props.sentences),
    };
  }

  componentWillReceiveProps(props) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      ds: ds, 
      dataSource: ds.cloneWithRows(props.sentences),
    });
  }

  render() {
    var sentenceTextStyle = ([
      styles.wordText,
      { paddingBottom: 20}
    ]);
    var comp = this; 
    console.log("saved sentences:" + JSON.stringify(this.state.dataSource));
    var sentenceList = (this.state.dataSource._dataBlob.s1.length == 0) ? 
      <Text style={styles.wordsHeader}>No Sentences Saved</Text>
      : (<ListView
            style={{paddingTop:10, }}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={ (rowData,sectionID, rowID) => {
              return(
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize: 24}}>{rowData}</Text>
                    <Text style={{fontSize: 24, color: "red"}}
                      onPress={ () => { 
                        Alert.alert(
                          'Delete Sentence?',
                          'Are you sure you want to delete this sentence?',
                          [
                              {text: 'Yes', onPress: () =>  {
                                  comp.props.remove_sentence(comp.props.uri.image_index,parseInt(rowID)); 
                                }
                              , style: 'cancel'},
                              {text: 'No', onPress: () => console.log('No delete sentence')},
                          ]
                        )
                        }}
                    >       x</Text>
                    </View>
                );
              }}
        />
      );
      return sentenceList;
  }
}

const SavedSentences = ({ uri,sentences,remove_sentence }) => (
  <View style={styles.container}>
      <Image
      source={{uri: uri.image}}
      style={styles.image}
      resizeMode="contain" />
    <SentenceView
        uri={uri}
        sentences={sentences}
        remove_sentence={remove_sentence}
        />
  </View>
)

/* Container Component */

const mapDispatchToProps = (dispatch) => {
  return {
      remove_sentence: (image_index, sentence_index ) => {
        dispatch(remove_sentence(image_index,sentence_index));
      }
  }
}

const mapStateToProps = (state) => {
  var index = state.currentSentence.activeImageIndex;
  var correct_image = state.images.image_list[index];
  var sentences = correct_image.sentence_strings;
  return {
    sentences: sentences, 
    uri: correct_image,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedSentences)
