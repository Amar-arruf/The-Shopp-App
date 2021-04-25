import PRODUCT from '../../data/dummy-data';
import { DELETE_PRODUCT } from '../actions/Product';

const initialState = {
    availableProducts : PRODUCT,
    userProducts: PRODUCT.filter(prod => prod.ownerId === 'u1')
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT :
            return {
                ...state,
                userProducts:state.userProducts.filter(product => product.id !== action.pid),
                availableProducts:state.availableProducts.filter(product => product.id !== action.pid),
            }
    }
    return state;
};