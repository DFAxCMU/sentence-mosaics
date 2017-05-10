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

class SentenceView extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      uri: this.props.uri, 
      ds: ds, 
      dataSource: ds.cloneWithRows(this.props.uri.sentence_strings),
    };
  }

  removeSentence(current_id,rowID,comp) {
    AsyncStorage.getItem("image_data").then((value) => {
      var image_data = JSON.parse(value);
      var index = -1;
      for (var i = 0; i < image_data.length; i++) {
        if (image_data[i].id == current_id) {
          index = i;
          image_data[i].sentence_strings.splice(rowID,1);
        }
      }
      var json_images = JSON.stringify(image_data); 
      AsyncStorage.setItem("image_data", json_images);
      var new_state = comp.state.ds.cloneWithRows(image_data[index].sentence_strings);
      comp.setState({dataSource: new_state});
    }).done();

  }

  render() {
    var sentenceTextStyle = ([
      styles.wordText,
      { paddingBottom: 20}
    ]);
    var comp = this;
    return (
      <ListView
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
                      'Are you sure you want to delete this Sentence?',
                      [
                          {text: 'Yes', onPress: () =>  {
                              comp.removeSentence(comp.state.uri.id,rowID,comp);
                            }
                          , style: 'cancel'},
                          {text: 'No', onPress: () => console.log('No delete image')},
                      ]
                    )
                    }}
                >x</Text>
              </View>
          );
            }}
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