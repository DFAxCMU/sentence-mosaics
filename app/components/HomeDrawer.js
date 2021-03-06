'use strict';

import React, { Component} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from 'react-native'
import { styles } from '../styles';
import { connect } from 'react-redux'

import { editWord, inputWord, setModal } from '../actions';

//import Dialog from 'react-native-dialog'
import Icon from 'react-native-vector-icons/Ionicons';

import {
    createFolder,
    deleteFolder,
    renameFolder,
    setFolder,
} from '../actions/folderActions.js';

import {
  deleteAllPhotos,
} from '../actions/homeActions';

class HomeDrawer extends Component  {

    constructor(props){
      super(props)
      this.state = {creatingFolder: false, folderName: '', renamingFolder: false}
    }
    handleInputChange(event){
      this.setState({folderName: event})
    }
    handleCloseButton(){
      this.setState({creatingFolder: false, folderName: '', renamingFolder: false})
    }
    handleOKButton(){
      if(this.state.folderName === ''){
        Alert.alert(
          "Whoops!",
          "Folder name cannot be empty!",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
      } else if (this.props.folders.slice().includes(this.state.folderName)) {
        Alert.alert(
          "Whoops!",
          "Remember to choose a name that is not already a folder!",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
      } else if(this.state.creatingFolder){
        this.props.createFolder(this.state.folderName)
        this.setState({creatingFolder: false, folderName: '', renamingFolder: false})
      } else if(this.state.renamingFolder){
        this.props.renameFolder(this.state.folderName)
        this.setState({creatingFolder: false, folderName: '', renamingFolder: false})
        //repetitive...any other way?
      }
    }

    render() {
      var separationLine = <View style={{
        height: 1, 
        backgroundColor:'#448479', 
        margin: 15,
        marginTop: 5}}></View>;
        
        var currentFolderOptions = <View></View>;
        if (this.props.currentFolder !== "Home Folder") {
          currentFolderOptions = (
            <View>
              <TouchableHighlight
                  onPress={ ()=>this.setState({renamingFolder:true}) }
                    style={styles.button}
                    accessibilityLabel="Rename This Folder">
                  <Text style={styles.wordText}>Rename This Folder</Text>
              </TouchableHighlight>
              <TouchableHighlight
                  onPress={ this.props.deleteFolder }
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
            
            { this.state.creatingFolder || this.state.renamingFolder ? 
             <Modal
             //animationType={'fade'} // Was slow and annoying 
                                      // but consider putting back later
               transparent={true}>
               <View style={styles.modalContainer}>
     
                 <View style={styles.modalRow}>
               
                   <Text style={styles.modalText}> 
                    {this.state.creatingFolder ? 
                    "Create new folder" : "Rename folder" }</Text>
                   
                   <TouchableOpacity
                     onPress={() => {this.handleCloseButton()}}>
                       <Icon name="ios-close" style={styles.closeModalButton}> </Icon>
                   </TouchableOpacity>
                 </View>
     
                 <View style={styles.modalRow}>
                   <TextInput
                     value={inputWord}
                     autoCapitalize="none"
                     onChangeText={this.handleInputChange.bind(this)}
                     style={styles.modalInput}
                     autoFocus = {true}
                     onSubmitEditing={this.handleOKButton.bind(this)}
                     placeholder={'Choose a new folder name!'} 
                   />
     
                   <TouchableOpacity
                     onPress= {this.handleOKButton.bind(this)}
                     style={styles.modalButton}>
                       <Text style={styles.modalText}>Enter</Text>
                   </TouchableOpacity>
                 </View>
     
               </View>
             </Modal> : null
            }

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
  createFolder,
  renameFolder,
  deleteFolder,
} 

const mapStateToProps = (state) => {
  return {
    currentFolder: state.images.currentFolder,
    folders: state.images.folders,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeDrawer);
