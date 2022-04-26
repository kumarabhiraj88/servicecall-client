import * as servicecallTypes  from '../types/servicecallTypes';

const initState = {
    tokenExpire: false,
    servicecalllist: { items: [], count: 0 },
	servicecallDetail: {},
    commentlist: { items: [], count: 0 },
	commentDetail: {},
    scFiledCount: 0,
	scCategorisedCount: 0,
	scProgressCount: 0,
	scPendingCount: 0,
	scResolvedCount: 0,
	scClosedCount:0
}


const servicecallReducer =  (state=initState, action) => {
    switch(action.type){
        
            case servicecallTypes.GET_SERVICECALLS:
                return {
                    ...state,
                    servicecalllist: { 
                        items: [...action.payload],
                        count: action.servicecallCount
                    }
                };
            case servicecallTypes.GET_SERVICECALL_DETAILS:
                return {
                    ...state,
                    servicecallDetail: { ...action.payload }
                }
            case servicecallTypes.EMPTY_SERVICECALL_DETAILS:
                return {
                    ...state,
                    servicecallDetail: {}
                }
            case servicecallTypes.GET_SERVICECALL_FILED:
			    return {
                    ...state,
                    scFiledCount: action.payload
			}
            case servicecallTypes.GET_SERVICECALL_CATEGORISED:
                return {
                    ...state,
                    scCategorisedCount: action.payload
                }
            case servicecallTypes.GET_SERVICECALL_PROGRESS:
                return {
                    ...state,
                    scProgressCount: action.payload
                }
            case servicecallTypes.GET_SERVICECALL_PENDING:
                return {
                    ...state,
                    scPendingCount: action.payload
                }
            case servicecallTypes.GET_SERVICECALL_RESOLVED:
                return {
                    ...state,
                    scResolvedCount: action.payload
                }
            case servicecallTypes.GET_SERVICECALL_CLOSED:
                return {
                    ...state,
                    scClosedCount: action.payload
                }
                
//SERVICECALL COMMENTS

            case servicecallTypes.GET_COMMENTS:
                return {
                    ...state,
                    commentlist: { 
                        items: [...action.payload],
                        count: action.commentCount
                    }
                };
            case servicecallTypes.GET_COMMENT_DETAILS:
                return {
                    ...state,
                    commentDetail: { ...action.payload }
                }
            case servicecallTypes.EMPTY_COMMENT_DETAILS:
                return {
                    ...state,
                    commentDetail: {}
                }
        default:
            return state;
    }

    
}

export default servicecallReducer;