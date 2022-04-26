import * as productTypes  from '../types/productTypes';

const initState = {
    tokenExpire: false,
    productlist: { items: [], count: 0 },
	productDetail: {}
}


const productReducer =  (state=initState, action) => {
    switch(action.type){
        
            case productTypes.GET_PRODUCTS:
                return {
                    ...state,
                    productlist: { 
                        items: [...action.payload],
                        count: action.productCount
                    }
                };
            case productTypes.GET_PRODUCT_DETAILS:
                return {
                    ...state,
                    productDetail: { ...action.payload }
                }
            case productTypes.EMPTY_PRODUCT_DETAILS:
                return {
                    ...state,
                    productDetail: {}
                }
        default:
            return state;
    }

    
}

export default productReducer;