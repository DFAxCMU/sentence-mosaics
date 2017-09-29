'use strict';

import React, { Component} from 'react';
import {AsyncStorage} from 'react-native'
import { Actions, Router, Scene } from 'react-native-router-flux';
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
import NewSentence from './components/NewSentence';
import RecordSentence from './components/RecordSentence';
import SavedSentences from './components/SavedSentences';
import ChooseSaveOrNew from './components/ChooseSaveOrNew';

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
                initial={true}
                type="reset" // Clear navigation stack
                />
              <Scene
                key="help"
                component={Help}
                title="Sentence Mosaics Help"
                />
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
              <Scene
                key="savedSentences"
                component={SavedSentences}
                title="Saved Sentences"
                onRight={() => Actions.home()}
                rightTitle="Done" />
              <Scene
                key="chooseSaveOrNew"
                component={ChooseSaveOrNew}
                title="Saved or New"
                />
            </Scene>
          </RouterWithRedux>
        </Provider>
      );
    }
}
