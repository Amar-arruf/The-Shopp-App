import PRODUCT from '../../data/dummy-data';

const initialState = {
    availableProducts : PRODUCT,
    userProducts: PRODUCT.filter(prod => prod.ownerId === 'u1')
};

export default (state = initialState, action) => {
    return state;
};