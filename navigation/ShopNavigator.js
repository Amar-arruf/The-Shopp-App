import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import {Platform, SafeAreaView, Button, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Color';
import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import CartScreen from '../screens/shop/CartScreen';
import UserProductsScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartScreeen';
import * as authActions from '../store/actions/auth';


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
    },
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
      <View style={{flex: 1, paddingTop: 20}}>
        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}} >
          <DrawerItems {...props}/>
          <Button 
            title="Logout" 
            color={Colors.primary} 
            onPress={() => {
              dispatch(authActions.logout());
              props.navigation.navigate('Auth');
          }}/>
        </SafeAreaView>
      </View>
      );
    }
  }
);

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen
}, {
  defaultNavigationOptions: defaultNavOptions
});

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);