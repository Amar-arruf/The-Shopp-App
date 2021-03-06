import React, {useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Button, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/Cart';
import HeaderButton from '../../components/UI/HeaderButton';
import * as ProductActions from '../../store/actions/Product';
import Colors from '../../constants/Color';

const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefeshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(state => state.products.availableProducts);
  const dispacth = useDispatch();
  
  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispacth(ProductActions.fetchProducts());
    } catch(err) {
      setError(err.message);
    }
    setIsRefreshing(false)
  }, [dispacth, setIsLoading, setError])

    useEffect(() => {
      const willFocusSub = props.navigation.addListener('willFocus', loadProducts);

      return() => {
        willFocusSub.remove();
      };
    }, [loadProducts]);


  useEffect( () => {
    setIsLoading(true);
    loadProducts().then(()=> {
      setIsLoading(false)
    });
  },[dispacth, loadProducts]);


  const SelectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId :id,
      productTitle :title
    });
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured!</Text>
        <Button 
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefeshing}
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

const styles = StyleSheet.create({
    centered: {
      flex:1, 
      justifyContent: 'center',
      alignItems: 'center'

    }
});

export default ProductsOverviewScreen;
