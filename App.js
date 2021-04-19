import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import ProductsReducers from './store/reducers/product';
import ShopNavigator from './navigation/ShopNavigator';

const rootReducers = combineReducers ({
  products: ProductsReducers
});

const store = createStore(rootReducers);

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator/>
    </Provider>
  );
}
