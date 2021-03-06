import React from 'react';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {Platform} from 'react-native';

import Colors from '../constants/Color';
import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import CartScreen from '../screens/shop/CartScreen';
import UserProductsScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import { Ionicons } from '@expo/vector-icons';

const defaultNavOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    },
    headerTitleStyle: {
      fontFamily: 'open-sans-bold'
    },
    headerBackTitle: {
      fontFamily: 'open-sans-bold'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductNavigators = createStackNavigator (
    {
        ProductsOverview : ProductsOverviewScreen,
        ProductDetail: ProductDetailScreen,
        Cart: CartScreen
    },
    {
      navigationOptions: {
        drawerIcon: drawerConfig => (
        <Ionicons 
        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
        size={23}
        color={drawerConfig.tintColor}
        />
      )
      },
      defaultNavigationOptions: defaultNavOptions
    }
    ); 

const OrdersNavigator = createStackNavigator (
  {
    Orders: OrdersScreen
  }, {
    navigationOptions: {
      drawerIcon: drawerConfig => (
      <Ionicons 
      name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} 
      size={23}
      color={drawerConfig.tintColor}
      />
    )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const AdminNavigator = createStackNavigator (
  {
    UserProducts: UserProductsScreen,
    EditProducts: EditProductScreen
  }, {
    navigationOptions: {
      drawerIcon: drawerConfig => (
      <Ionicons 
      name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} 
      size={23}
      color={drawerConfig.tintColor}
      />
    )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductNavigators,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
  }, {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

export default createAppContainer(ShopNavigator);