'use strict';

import React, { Component } from 'react';
import Home from './app/Home';
import NewSentence from './app/NewSentence';
import {
  AppRegistry,
  Navigator,
  TouchableHighlight,
  Text,
  Button,
  StyleSheet,
  View,
} from 'react-native';

export default class SentenceMosaics extends Component {

  renderScene(route, navigator) {
    var page = <Home navigator={navigator} {...route.passProps} />;
    if (route.name == 'NewSentence') {
      page = <NewSentence navigator={navigator} {...route.passProps} />
    };
    return (
      <View style={styles.container}>
        { page }
      </View>
    )
  }

  render() {

    var NavigationBarRouteMapper = {
      LeftButton(route, navigator, index, navState) {
        if (index > 0) {
          return (
            <Button
              title='&#60;'
              onPress={() => {if (index > 0) { navigator.pop() } }} />
          )
        }
        else { return null }
      },

      RightButton(route, navigator, index, navState) {
        return
      },

      Title(route, navigator, index, navState) {
        return <Text style={styles.header}>Sentence Mosaics</Text>
      }
    };

    return (
      <Navigator
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={ NavigationBarRouteMapper } /> }
        initialRoute={{ name: 'Home' }}
        renderScene={this.renderScene.bind(this)} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#c7e5e1',
    marginTop: 60,
  },
  header: {
    fontSize: 15,
    marginTop: 10
  }
});

AppRegistry.registerComponent('SentenceMosaics', () => SentenceMosaics);
