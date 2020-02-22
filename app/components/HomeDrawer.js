import React, { Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native'
import { styles } from '../styles';
import { connect } from 'react-redux'
import Dialog from 'react-native-dialog'
import {
  deleteAllPhotos,
  handleCreateFolder,
  handleRenameFolder,
  handleDeleteFolder,
} from '../actions/homeActions';

class HomeDrawer extends Component  {
    constructor(props){
      super(props)
      this.state = {creatingFolder: false, folderName: '', renamingFolder: false}
    }
    handleInputChange(event){
      this.setState({folderName: event.nativeEvent.text})
    }
    handleCancelButton(){
      this.setState({creatingFolder: false, folderName: '', renamingFolder: false})
    }
    handleOKButton(){
      if(this.state.creatingFolder){
        this.props.handleCreateFolder(this.state.folderName)
      }
      if(this.state.renamingFolder){
        this.props.handleRenameFolder(this.state.folderName)
      }
      this.setState({creatingFolder: false, folderName: '', renamingFolder: false})
    }
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
                  onPress={ ()=>this.setState({renamingFolder:true}) }
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
      <View>
        <Dialog.Container visible={this.state.creatingFolder || this.state.renamingFolder}>
          <Dialog.Title>New Folder Name</Dialog.Title>
          <Dialog.Description>
            Remember to choose a name that is not already a folder name!
          </Dialog.Description>
          <Dialog.Input
              onChange = {this.handleInputChange.bind(this)}/>
          <Dialog.Button label="Cancel" 
            onPress = {this.handleCancelButton.bind(this)}/>
          <Dialog.Button label="OK"
           onPress= {this.handleOKButton.bind(this)} />
        </Dialog.Container>
      </View>
            { currentFolderOptions }
            <TouchableHighlight
                onPress={ ()=>this.setState({creatingFolder:true}) }
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