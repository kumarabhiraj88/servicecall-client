import * as servicecallServices  from '../services/servicecallServices';
import * as servicecallTypes from '../types/servicecallTypes';
import { useHistory } from "react-router-dom";


export const getServicecalls = (limit = 10, skip = 0, query = '', pagination=true) => async dispatch => {
	try{  
		const loggedUserId = localStorage.getItem('loggeduserid');
		const loggedPrivilegeId = localStorage.getItem('privilegeId');
		const loggedCompanyId = localStorage.getItem('loggedCompanyId');
		 const { data } = await servicecallServices.getServicecallApi(loggedUserId, loggedPrivilegeId, loggedCompanyId, limit, skip, query, pagination);
		 dispatch({
			type: servicecallTypes.GET_SERVICECALLS,
			payload: data.data.items,
			servicecallCount: data.data.total
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
//search servicecall
export const searchServicecalls = (query) => async dispatch => {
	getServicecalls(10, 0, query)(dispatch);
}
//create new servicecall
export const addServicecallAction = payload => async dispatch => {	
			await servicecallServices.addServicecallApi(payload);
			getServicecalls()(dispatch);
};

//update servicecall
export const updateServicecallAction = body => async dispatch => {
	let id = body.servicecallId;
	await servicecallServices.updateServicecallApi(body, id);
	getServicecalls()(dispatch);
};

//get servicecall details
export const getServicecallDetail = (id) => async dispatch => {
	try {
			const {data} = await servicecallServices.getServicecallDetailApi(id);
			
			dispatch({
				type: servicecallTypes.GET_SERVICECALL_DETAILS,
				payload: data.data
			})
	}
	catch (err) {
			throw err;
	}
};

export function getServicecallsDashboardCount(ScStatus) {
		const loggedPrivilegeId = localStorage.getItem('privilegeId');
		const loggedCompanyId = localStorage.getItem('loggedCompanyId');
	return servicecallServices.getServicecallsDashboardApi(ScStatus, loggedPrivilegeId, loggedCompanyId);

};

export const getScFiled = (id) => async dispatch => {
	try {
			const ScStatus =0;
			const { data } =  await getServicecallsDashboardCount(ScStatus);
			dispatch({
			 	type: servicecallTypes.GET_SERVICECALL_FILED,
			 	payload: data.data
			 })
		}
		catch(error){
			throw error;
	}
};			 

export const getScCategorised = (id) => async dispatch => {
	try {
			const ScStatus =1;
			const { data } =  await getServicecallsDashboardCount(ScStatus);
			dispatch({
			 	type: servicecallTypes.GET_SERVICECALL_CATEGORISED,
			 	payload: data.data
			 })
		}
		catch(error){
			throw error;
		}
};

export const getScProgress = (id) => async dispatch => {
	try {
			const ScStatus =2;
			const { data } =  await getServicecallsDashboardCount(ScStatus);
			dispatch({
			 	type: servicecallTypes.GET_SERVICECALL_PROGRESS,
			 	payload: data.data
			 })
		}
		catch(error){
			throw error;
		}
};

export const getScPending = (id) => async dispatch => {
	try {
			const ScStatus =3;
			const { data } =  await getServicecallsDashboardCount(ScStatus);
			dispatch({
			 	type: servicecallTypes.GET_SERVICECALL_PENDING,
			 	payload: data.data
			 })
		}
		catch(error){
			throw error;
		}
};

export const getScResolved = (id) => async dispatch => {
	try {
			const ScStatus =4;
			const { data } =  await getServicecallsDashboardCount(ScStatus);
			dispatch({
			 	type: servicecallTypes.GET_SERVICECALL_RESOLVED,
			 	payload: data.data
			 })
		}
		catch(error){
			throw error;
		}
};

export const getScClosed = (id) => async dispatch => {
	try {
			const ScStatus =5;
			const { data } =  await getServicecallsDashboardCount(ScStatus);
			dispatch({
			 	type: servicecallTypes.GET_SERVICECALL_CLOSED,
			 	payload: data.data
			 })
		}
		catch(error){
			throw error;
		}
};


export const emptyServicecallDetails = () => async dispatch => {
	dispatch({
		type: servicecallTypes.EMPTY_SERVICECALL_DETAILS
	});
}

// export const deleteServicecall = async id => {
// 	await servicecallServices.deleteServicecallApi(id);
// 	getServicecalls()(dispatch);
// };

	export const deleteServicecall = (id) => async dispatch => {
	await servicecallServices.deleteServicecallApi(id);
	getServicecalls()(dispatch);
};




//SERVICECALL COMMENTS

export const getComments = (masterId, limit = 10, skip = 0, query = '', pagination=true) => async dispatch => {
	try{  
		 const { data } = await servicecallServices.getCommentApi(masterId, limit, skip, query, pagination);
		 dispatch({
			type: servicecallTypes.GET_COMMENTS,
			payload: data.data.items,
			commentCount: data.data.total
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

export const searchComments = (query) => async dispatch => {
	getComments(10, 0, query)(dispatch);
}

export const addCommentAction = payload => async dispatch => {
	const { data } = await servicecallServices.addCommentApi(payload);
	getComments(data.data.masterId)(dispatch);
};

export const updateCommentAction = body => async dispatch => {
	try{
		const { data } = await servicecallServices.updateCommentApi(body);
		getComments(data.data.masterId)(dispatch);
	}
	catch(err){
		throw err;
	}
};


export const getCommentDetail = (id) => async dispatch => {
	try {
			const {data} = await servicecallServices.getCommentDetailApi(id);
			dispatch({
				type: servicecallTypes.GET_COMMENT_DETAILS,
				payload: data.data
			})
	}
	catch (err) {
			throw err;
	}
};

export const emptyCommentDetails = () => async dispatch => {
	dispatch({
		type: servicecallTypes.EMPTY_COMMENT_DETAILS
	});
}

export const downloadImgAction = payload => async dispatch => {
	//console.log(payload);
	const filename=payload;
	let payloaddata = payload.filename;
	return await servicecallServices.downloadImgApi(payloaddata);

};

export const deleteComment = (id) => async dispatch => {
	const { data } = await servicecallServices.deleteCommentApi(id);
	getComments(data.data.masterId)(dispatch);
};




