'use strict';

import React, { Component} from 'react';
import {AsyncStorage} from 'react-native'
import { Actions, Drawer, Router, Scene } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import {compose, applyMiddleware, createStore} from 'redux'
import {persistStore, autoRehydrate} from 'redux-persist'
import thunk from 'redux-thunk';

const RouterWithRedux = connect()(Router);
import allReducers from './reducers';

const store = createStore(
  allReducers,
  applyMiddleware(thunk),
  compose(
    autoRehydrate()
  )
)
persistStore(store, {storage: AsyncStorage});

import { styles } from './styles';

import Home from './components/Home';
import Help from './components/Help';
import Info from './components/Info';
import NewSentence from './components/NewSentence';
import RecordSentence from './components/RecordSentence';
import SavedSentences from './components/SavedSentences';
import ChooseSaveOrNew from './components/ChooseSaveOrNew';
import HomeDrawer from './components/HomeDrawer.js';

export default class App extends Component {
    render() {
      return (
        <Provider store={store}>
          <RouterWithRedux>
            <Scene key="root">
              <Drawer
                  hideNavBar
                  key="homeDrawer"
                  contentComponent={HomeDrawer}
                  drawerWidth={250}
                  drawerPosition="right"
              >
              <Scene
                key="home"
                component={Home}
                title="Sentence Mosaics"
                initial={true}
                type="reset" // Clear navigation stack 
              />
              </Drawer>
              <Scene
                key="help"
                component={Help}
                title="Sentence Mosaics Help" />
              <Scene
                key="info"
                component={Info}
                title="Sentence Mosaics Info" />
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
                onRight={() => Actions.homeDrawer()}
                rightTitle="Done" />
              <Scene
                key="savedSentences"
                component={SavedSentences}
                title="Saved Sentences"
                onRight={() => Actions.homeDrawer()}
                rightTitle="Done" />
              <Scene
                key="chooseSaveOrNew"
                component={ChooseSaveOrNew}
                title="Saved or New" />
            </Scene>
          </RouterWithRedux>
        </Provider>
      );
    }
}
