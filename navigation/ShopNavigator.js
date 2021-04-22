import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Platform} from 'react-native';

import Colors from '../constants/Color';
import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';

const ProductNavigators = createStackNavigator (
    {
        ProductsOverview : ProductsOverviewScreen,
        ProductDetail: ProductDetailScreen,
        Cart: CartScreen
    },
    {
      defaultNavigationOptions: {
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
    }
    );

export default createAppContainer(ProductNavigators);