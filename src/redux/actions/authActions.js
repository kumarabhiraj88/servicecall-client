import * as userTypes from '../types/userTypes';
import { loginApi, logoutApi } from '../services/authServices';

export const authAction = (payload) => {
    return async (dispatch) => {
        try {   
                const { data } = await loginApi(payload);
                if(data.responseCode === 200){
                    localStorage.setItem('token', data.data.token);
                    localStorage.setItem('privilegeId', data.data.privilegeId);
                    localStorage.setItem('name', data.data.name);
                    localStorage.setItem('loggeduserid', data.data.userid);
                    localStorage.setItem('loggedCompanyId', data.data.companyId);
                    localStorage.setItem('loggedCompanyLogo', data.data.companyLogo);
                    localStorage.setItem('loggedCompany', data.data.company);
                }
                dispatch({
                    type: userTypes.AUTHENTICATE_USER,
                    payload: data
                });

        }catch(err){
            throw err;
        }
    }
}


export const logoutAction = () => async dispatch => {
	try {
		await logoutApi();
		dispatch({
			type: userTypes.LOGOUT_USER
		});
	} catch (error) {
		throw error;
	}
};

