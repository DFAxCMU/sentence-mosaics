'use strict'

import React, { Component } from 'react'
import {
  View,
  Image,
  Alert,
  Button,
  Text,
  TouchableHighlight,
  ImagePickerIOS,
  ListView,
  AsyncStorage,

} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { selectPhoto, showDefaultSentence, clearWordPicker, add_image, delete_image} from '../actions'
import { styles } from '../styles'

import Realm from 'realm'
let realm = new Realm({
  schema: [{name: 'Photos', properties: {uri: 'string'}}]
})

class ImageListView extends Component  {
  constructor(props) {
    super(props);
  }

  render() {
    return (
  <View style={styles.container}>
    <ListView contentContainerStyle={styles.list}
      enableEmptySections={true}
      dataSource={this.props.ds}
      pageSize={9} // Needs to be a multiple of the number of
                   // cells per row or else they will be gaps
                   // when the rows are loaded
      renderRow={(rowData, sectionID, rowID, highlightRow) =>
        <TouchableHighlight
          underlayColor='transparent'
          onPress={this.props.onPhotoClick.bind(this, (rowID))}
          onLongPress={ () => 
              Alert.alert(
                'Delete Image?',
                'Are you sure you want to delete this image?',
                [
                    {text: 'Yes', onPress: () =>  {
                          this.props.delete_image(rowID);
                      }
                    , style: 'cancel'},
                    {text: 'No', onPress: () => console.log('No delete image')},
                ]
              )}>
        <Image
          style={styles.item}
          resizeMode='cover'
          source={{uri: rowData.image}} />
        </TouchableHighlight>
      } />    

    <TouchableHighlight
        onPress={() => ImagePickerIOS.openSelectDialog({}, imageUri => {
              this.props.add_image(imageUri);}, error => {})}
        style={styles.button}
        accessibilityLabel="Import New Photos">
        
        <Text style={styles.wordText}>Import Photos</Text>
    </TouchableHighlight>

    </View>
    );
  }
}

var Home = ({ ds,onPhotoClick, delete_image, add_image }) => (
    <ImageListView 
    ds={ds}
    onPhotoClick={ onPhotoClick }
    delete_image= {delete_image}
    add_image= {add_image}
     />
)

/* Container Component */

const mapDispatchToProps = (dispatch) => {
  return{ onPhotoClick: (index) => { 
    dispatch(selectPhoto(index))
    Actions.chooseSaveOrNew()
    dispatch(showDefaultSentence())
  },
  delete_image:  (index) => {
    dispatch(delete_image(index));
  }, 
  add_image: (image) => {
    dispatch(add_image(image));
  }, 
  }
}

const mapStateToProps = (state) => {
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  ds.removeClippedSubviews = false;
  var images = ds.cloneWithRows(state.images.image_list);
  return {
    "ds": images, 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)