import React, { Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native'
import { styles } from '../styles';
import { connect } from 'react-redux'

import {
  deleteAllPhotos,
  handleCreateFolder,
  handleRenameFolder,
  handleDeleteFolder,
} from '../actions/homeActions';

class HomeDrawer extends Component  {
    render() {
      var separationLine = <View style={{
        height: 1, 
        backgroundColor:'#448479', 
        margin: 15,
        marginTop: 5}}></View>;
        
        var currentFolderOptions = <View></View>;
        if (this.props.folder !== "Home Folder") {
          currentFolderOptions = (
            <View>
              <TouchableHighlight
                  onPress={ this.props.handleRenameFolder }
                    style={styles.button}
                    accessibilityLabel="Rename This Folder">
                  <Text style={styles.wordText}>Rename This Folder</Text>
              </TouchableHighlight>
              <TouchableHighlight
                  onPress={ this.props.handleDeleteFolder }
                    style={styles.button}
                    accessibilityLabel="Delete This Folder">
                  <Text style={styles.wordText}>Delete This Folder</Text>
              </TouchableHighlight>
              { separationLine }
            </View>
          );
        }


        return (
            <View style={styles.homeDrawer}>
            { currentFolderOptions }
            <TouchableHighlight
                onPress={ this.props.handleCreateFolder }
                  style={ styles.button }
                  accessibilityLabel="Create New Folder">
                <Text style={styles.wordText}>Create New Folder</Text>
            </TouchableHighlight>
            { separationLine }
            <TouchableHighlight
                onPress={ this.props.deleteAllPhotos }
                  style={ styles.button }
                  accessibilityLabel="Delete All Photos">
                <Text style={styles.wordText}>Delete All Photos</Text>
            </TouchableHighlight>
            </View>
        );
    }
}

const mapDispatchToProps = {
  deleteAllPhotos,
  handleCreateFolder,
  handleRenameFolder,
  handleDeleteFolder,
} 

const mapStateToProps = (state) => {
  return {
    "folder": state.images.folder,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeDrawer);