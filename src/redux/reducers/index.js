import { combineReducers } from 'redux';
import userReducer from './userReducer';
import companyReducer from './companyReducer';
import productReducer from './productReducer';
import servicecallReducer from './servicecallReducer';
import commonReducer from './commonReducer';
import sidebarReducer from './sidebarReducer';


export default combineReducers({
    userReducer,
    companyReducer,
    productReducer,
    servicecallReducer,
    commonReducer,
    sidebarReducer,
})