import {
  FETCH_PRODUCT_SUCCESS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
} from '../actions/actionType';

const initialState = {
  products: [],
  error: null
}
export default function product(state = initialState, action) {
   switch (action.type) {
     case FETCH_PRODUCT_SUCCESS:
        return {
          ...state,
          products: action.products.data
        };

      case ADD_PRODUCT:
         return {
           ...state,
            products: [...state.products, action.product.data]
         };

       case EDIT_PRODUCT:
          return {
            ...state,
             product: action.product.data
          };
      case UPDATE_PRODUCT:
         return {
           ...state,
            product:  action.product.data
         };

     case DELETE_PRODUCT:
        return {
          ...state,
          products: state.products.filter(product => product._id !== action.id)
        };

      default:
       return state;
   }
}
