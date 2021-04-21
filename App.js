import React, {useState} from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import AppLoading  from 'expo-app-loading';
import * as Font from 'expo-font';


import ProductsReducers from './store/reducers/product';
import ShopNavigator from './navigation/ShopNavigator';

const rootReducers = combineReducers ({
  products: ProductsReducers
});

const store = createStore(rootReducers);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans" : require("./assets/fonts/open-sans-regular.ttf"),
    "open-sans-bold" : require("./assets/fonts/open-sans-bold.ttf")
  });
};

export default function App() {
  const [fontLoaded,setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
      onError={console.warn}
      />
    )
  }

  return (
    <Provider store={store}>
      <ShopNavigator/>
    </Provider>
  );
}
