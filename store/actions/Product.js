import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async dispatch => {
    // any async code you want!
    try {
      const response = await fetch(
        'https://rn-complete-guide-57cd5-default-rtdb.asia-southeast1.firebasedatabase.app/Products.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
   
       const resData = await response.json();
       const loadedProduct = [];
   
       for (const key in resData) {
           loadedProduct.push(new Product(
             key,
             'u1',
             resData[key].title,
             resData[key].imageUrl,
             resData[key]. description,
             resData[key].price
             ));
       }
   
       dispatch({type : SET_PRODUCT, products: loadedProduct})
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
   
  };
};

export const deleteProduct =productId => {
  return async dispatch => {
    const response = await fetch (`https://rn-complete-guide-57cd5-default-rtdb.asia-southeast1.firebasedatabase.app/Products/${productId}.json`,
    {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({ type: DELETE_PRODUCT, pid: productId });
  }
};

export const createProduct = (title, description, imageUrl, price) => {
  return async dispatch => {
    // any async code you want!
   const response = await fetch('https://rn-complete-guide-57cd5-default-rtdb.asia-southeast1.firebasedatabase.app/Products.json',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      description,
      imageUrl,
      price
      })
    });

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id : resData.name,
        title,
        description,
        imageUrl,
        price
      }
    });
  }
  
};

export const updateProduct = (id,title, description, imageUrl,) => {
  return async dispatch => {
     const response = await fetch(`https://rn-complete-guide-57cd5-default-rtdb.asia-southeast1.firebasedatabase.app/Products/${id}.json`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      description,
      imageUrl,
      })
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch ({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl
      }
    })
  }
  
};