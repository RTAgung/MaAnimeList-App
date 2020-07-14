import React from 'react';

import Index from './index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './User';

export const store = createStore(reducer)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

