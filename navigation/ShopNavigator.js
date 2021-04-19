import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Platform} from 'react-native';

import Colors from '../constants/Color';
import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen';

const ProductNavigators = createStackNavigator (
    {
        ProductsOverview : ProductsOverviewScreen
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