import * as companyTypes  from '../types/companyTypes';

const initState = {
    tokenExpire: false,
    companylist: { items: [], count: 0 },
	companyDetail: {}
}


const companyReducer =  (state=initState, action) => {
    switch(action.type){
        
            case companyTypes.GET_COMPANIES:
                return {
                    ...state,
                    companylist: { 
                        items: [...action.payload],
                        count: action.companyCount
                    }
                };
            case companyTypes.GET_COMPANY_DETAILS:
                return {
                    ...state,
                    companyDetail: { ...action.payload }
                }
            case companyTypes.EMPTY_COMPANY_DETAILS:
                return {
                    ...state,
                    companyDetail: {}
                }
        default:
            return state;
    }

    
}

export default companyReducer;