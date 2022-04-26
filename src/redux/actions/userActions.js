import * as userServices  from '../services/userServices';
import * as userTypes from '../types/userTypes';
import { useHistory } from "react-router-dom";


export const updatePasswordAction = (payload)=> async dispatch =>{
    await userServices.updatePasswordApi(payload);
}

export const getImplementorsList = (data) => async dispatch => {
	const { data } = await userServices.getImplementorsApi();
	
	dispatch({
		type: userTypes.GET_IMPLEMENTORS,
		payload: data.data
	});
}

export const getUsers = (limit = 10, skip = 0, query = '', pagination=true) => async dispatch => {
	try{  
		 const { data } = await userServices.getUsersApi(limit, skip, query, pagination);
		 dispatch({
			type: userTypes.GET_USERS,
			payload: data.data.items,
			userCount: data.data.total
		});

	}
	catch (error) {
		if( (error.responseCode === 400 || error.responseCode === 401)	&&
		error.message === "Token Expired"){
			localStorage.removeItem('token');
			useHistory.push("/");
		}
		throw error;
	}

};
//search user
export const searchUsers = (query) => async dispatch => {
		getUsers(10, 0, query)(dispatch);
}
//create new user
export const addUserAction = payload => async dispatch => {
			await userServices.addUserApi(payload);
			getUsers()(dispatch);
};

//update user
export const updateUserAction = body => async dispatch => {
	let id = body.userId;
	await userServices.updateUserApi(body, id);
	getUsers()(dispatch);
};

//get user details
export const getUserDetail = (id) => async dispatch => {
	try {
			const {data} = await userServices.getUserDetailApi(id);
			dispatch({
				type: userTypes.GET_USER_DETAILS,
				payload: data.data
			})
	}
	catch (err) {
			throw err;
	}
};

export const emptyUserDetails = () => async dispatch => {
	dispatch({
		type: userTypes.EMPTY_USER_DETAILS
	});
}


export const userEnableDisable = (id, status) => async dispatch => {
	try {
		await userServices.userEnableDisableApi(id, status);
		getUsers()(dispatch);
	}
	catch (err) {
			throw err;
	}
};




