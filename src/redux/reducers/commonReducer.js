import * as companyTypes  from '../types/companyTypes';
import * as productTypes  from '../types/productTypes';
import * as userTypes  from '../types/userTypes';

const initState = {
    companylist: { items: [] },
    productlist: { items: [] },
    implementorlist: { items: [] },
}


const commonReducer =  (state=initState, action) => {
    switch(action.type){
        
            case companyTypes.GET_COMPANIES:
                return {
                        ...state,
                        companylist: { 
                            items: [...action.payload],
                        }
                };
            case productTypes.GET_PRODUCTS:
                return {
                        ...state,
                        productlist: { 
                            items: [...action.payload],
                        }
                    };
            case userTypes.GET_IMPLEMENTORS:
                return {
                        ...state,
                        implementorlist: { 
                            items: [...action.payload],
                        }
                    };
        default:
            return state;
    }

    
}

export default commonReducer;