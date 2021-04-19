import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Platform} from 'react-native';

import Colors from '../constants/Color';
import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';

const ProductNavigators = createStackNavigator (
    {
        ProductsOverview : ProductsOverviewScreen,
        ProductDetail: ProductDetailScreen
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
      }
    }
    );

export default createAppContainer(ProductNavigators);