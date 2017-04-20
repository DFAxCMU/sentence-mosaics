'use strict';

import React, { Component } from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';

const RouterWithRedux = connect()(Router);
import allReducers from './reducers';

const store = createStore(allReducers);

import { styles } from './styles';

import Home from './components/Home';
import NewSentence from './components/NewSentence';
import RecordSentence from './components/RecordSentence';

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">
            <Scene
              key="home"
              component={Home}
              title="Sentence Mosaics"
              type="reset" // Clear navigation stack
              initial={true} />
            <Scene
              key="newSentence"
              component={NewSentence}
              title="New Sentence"
              onRight={() => Actions.recordSentence()}
              rightTitle="Submit" />
            <Scene
              key="recordSentence"
              component={RecordSentence}
              title="Record Sentence"
              onRight={() => Actions.home()}
              rightTitle="Done" />
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}