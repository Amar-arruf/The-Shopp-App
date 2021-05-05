export const ADD_ORDER ='ADD_ORDER';

export const addOrder = (cartItems, totalAmount) => {
  const date = new Date();
    return async dispatch =>  {
      const response = await fetch('https://rn-complete-guide-57cd5-default-rtdb.asia-southeast1.firebasedatabase.app/Orders/u1.json',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cartItems,
      totalAmount,
      date: date.toISOString(),
      })
    });

    if (!response.ok) {
      throw new Error('Something went wrong!')
    }

    const resData = await response.json();
        dispatch ({
            type: ADD_ORDER,
            orderData: {
              id: resData.name , 
              items: cartItems, 
              amount: totalAmount ,
              date: date
              }
        });
    }
    
};