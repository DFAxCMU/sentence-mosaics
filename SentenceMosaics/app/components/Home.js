'use strict'

import React, { Component } from 'react'
import {
  View,
  Image,
  Alert,
  Button,
  TouchableHighlight,
  ImagePickerIOS,
  ListView,
  AsyncStorage,

} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { selectPhoto, showDefaultSentence, clearWordPicker} from '../actions'
import { styles } from '../styles'

/* Hardcoded Images for Photo Gallery */

import Realm from 'realm'
let realm = new Realm({
  schema: [{name: 'Photos', properties: {uri: 'string'}}]
})
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
ds.removeClippedSubviews = false

var image_id_count = 0;
var images =  ['https://s-media-cache-ak0.pinimg.com/564x/21/c4/af/21c4af62d979e779f08730def389c7a4.jpg', 
  'https://pulsations.files.wordpress.com/2010/05/randomdog.jpg', 
  'https://alpha.wallhaven.cc/wallpapers/thumb/small/th-439774.jpg',
  'https://s-media-cache-ak0.pinimg.com/736x/1c/2b/0e/1c2b0e1391f95210ce394d8f6ffc3349.jpg', 
  'https://az616578.vo.msecnd.net/files/responsive/embedded/any/desktop/2016/03/02/6359254205422825251433349260_pointe.jpg',
  'https://d1amk1w0mr5k0.cloudfront.net/files/2012/09/Toddler-Excited-About-Reading-Tips2.jpg', 
  'https://thumbs.dreamstime.com/x/jumping-child-7002757.jpg', 
  'https://www.cfbham.org/wp-content/uploads/2015/04/Childhood-nutrition.jpg', 
  'https://thumbs.dreamstime.com/x/child-swimming-17490975.jpg', 
  'https://static1.squarespace.com/static/53f25b20e4b0d6b2d8640379/t/553e2672e4b06614df78db39/1430136459547/', 
  'https://wesayyesprogram.com/wp-content/uploads/2015/07/man-walking-dog.jpg', 
  'https://ionehellobeautiful.files.wordpress.com/2015/02/mom-cooking-dinner.jpg?quality=70&strip=all&w=630&h=420'
];
var image_data = [];

var have_loaded = false; 


class ImageListView extends Component  {
  constructor(props) {
    super(props);
    this.state = {all_images: ds.cloneWithRows(image_data)};
    if (have_loaded == false) {
      this.load();
      have_loaded = true;
    }
  }

  load() {
    AsyncStorage.getItem("image_data").then((value) => {
      if (value != null) {
        image_data = JSON.parse(value);
        this.setState({all_images: ds.cloneWithRows(image_data)});
      } else {
        //sync for first time
        for (var i = 0; i < images.length; i++) {
          var d = {
          id: image_id_count,
          image: images[i], 
          sentence_strings: [],
          };
          image_data[i] = d;
          image_id_count += 1;
        }
        this.sync();
      }
    }).done();
  }

  sync() {
      this.setState({all_images: ds.cloneWithRows(image_data)});
      var json_images = JSON.stringify(image_data); 
      AsyncStorage.setItem("image_data", json_images);
  }

  render() {
    this.load();
    return (
  <View style={styles.container}>
    <ListView contentContainerStyle={styles.list}
      enableEmptySections={true}
      dataSource={this.state.all_images}
      pageSize={9} // Needs to be a multiple of the number of
                   // cells per row or else they will be gaps
                   // when the rows are loaded
      renderRow={(rowData, sectionID, rowID, highlightRow) =>
        <TouchableHighlight
          underlayColor='transparent'
          onPress={this.props.onPhotoClick.bind(this, rowData)}
          onLongPress={ () => 
              Alert.alert(
                'Delete Image?',
                'Are you sure you want to delete this image?',
                [
                    {text: 'Yes', onPress: () =>  {
                          image_data.splice(rowID,1); 
                          this.sync()
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
    <Button title="Import Photos"
            onPress={() => ImagePickerIOS.openSelectDialog({}, imageUri => {
              var d = {
                id: image_id_count,
                image: imageUri, 
                sentence_strings: [],
              };
              image_id_count += 1;
              image_data.push(d); 
              this.sync()
              }, error => {})}
            accessibilityLabel="Import New Photos" />
    {/*<Button title="Take Photo"
            onPress={() => Alert.alert("Notice","Not yet Implemented!",[ {text : "Ok"}])}
            accessibilityLabel="Take a New Photo" />*/}
    </View>
    );
  }
}

var Home = ({ onPhotoClick }) => (
    <ImageListView onPhotoClick={ onPhotoClick }
     />
)

/* Container Component */

const mapDispatchToProps = (dispatch) => {

  return{ onPhotoClick: (uri) => { 
    dispatch(selectPhoto(uri))
    Actions.chooseSaveOrNew()
    dispatch(showDefaultSentence())
  }}
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)