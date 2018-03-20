import React, { Component} from 'react';
import {
  View,
  Image,
  Button,
  Text,
  TouchableHighlight,
  ListView,
} from 'react-native'
import { styles } from '../styles';
import { connect } from 'react-redux'

import {
  deleteAllPhotos,
} from '../actions/homeActions';

class HomeDrawer extends Component  {
    render() {
        return (
            <View style={styles.homeDrawer}>
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
  deleteAllPhotos
} 

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeDrawer);