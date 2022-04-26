import * as userTypes  from '../types/userTypes';

const initState = {
    loginDetails:{},
    tokenExpire: false,
    userlist: { items: [], count: 0 },
	userDetail: {}
}


const userReducer =  (state=initState, action) => {
    switch(action.type){
        case userTypes.AUTHENTICATE_USER:
            return {
                ...state,
                loginDetails: { ...action.payload },
                tokenExpire:false
            }
        case userTypes.LOGOUT_USER:
				return {
					...state,
					loginDetails: {}
			};
            case userTypes.GET_USERS:
                return {
                    ...state,
                    userlist: { 
                        items: [...action.payload],
                        count: action.userCount
                    }
                };
            case userTypes.GET_USER_DETAILS:
                return {
                    ...state,
                    userDetail: { ...action.payload }
                }
            case userTypes.EMPTY_USER_DETAILS:
                return {
                    ...state,
                    userDetail: {}
                }
        default:
            return state;
    }

    
}

export default userReducer;