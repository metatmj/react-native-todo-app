import React from 'react';
import { Provider } from 'react-redux'
import { store } from './src/state/store'

import RootNavigator from './src/navigation'

export default App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

