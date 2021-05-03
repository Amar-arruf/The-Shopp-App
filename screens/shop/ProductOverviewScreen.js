import React, { useEffect } from 'react';
import { FlatList, Button, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/Cart';
import HeaderButton from '../../components/UI/HeaderButton';
import * as ProductActions from '../../store/actions/Product';
import Colors from '../../constants/Color';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispacth = useDispatch();

  useEffect( () => {
    dispacth(ProductActions.fetchProducts())
  },[dispacth]);


  const SelectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId :id,
      productTitle :title
    });
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => 
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={()=> {
            SelectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button 
          color={Colors.primary} 
          title="View Details" 
          onPress={()=> {
            SelectItemHandler(itemData.item.id, itemData.item.title);
          }}/>
          <Button 
          color={Colors.primary} 
          title="To Cart" 
          onPress={() => {
            dispacth(cartActions.addToCart(itemData.item));
          }}/>
        </ProductItem>
      }
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
  headerTitle: 'All Products',
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item 
        title="Menu"
        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onPress= {() => {
          navData.navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  ),
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item 
        title="Cart"
        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        onPress= {() => {
          navData.navigation.navigate('Cart');
        }}
      />
    </HeaderButtons>
    )
  };
};

export default ProductsOverviewScreen;
