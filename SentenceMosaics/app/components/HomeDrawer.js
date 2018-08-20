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
  handleDeleteFolder,
} from '../actions/homeActions';

class HomeDrawer extends Component  {
    render() {
        var deleteButton = <View></View>;
        if (this.props.folder !== "Home Folder") {
          deleteButton = (
            <TouchableHighlight
                onPress={ this.props.handleDeleteFolder }
                  style={styles.button}
                  accessibilityLabel="Delete this Folder">
                <Text style={styles.wordText}>Delete this Folder</Text>
            </TouchableHighlight>
          );
        }
        return (
            <View style={styles.homeDrawer}>
            <TouchableHighlight
                onPress={ this.props.handleCreateFolder }
                  style={styles.button}
                  accessibilityLabel="Create New Folder">
                <Text style={styles.wordText}>Create New Folder</Text>
            </TouchableHighlight>
            { deleteButton }
            <TouchableHighlight
                onPress={ this.props.deleteAllPhotos }
                  style={styles.button}
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
  handleDeleteFolder,
} 

const mapStateToProps = (state) => {
  return {
    "folder": state.images.folder,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeDrawer);