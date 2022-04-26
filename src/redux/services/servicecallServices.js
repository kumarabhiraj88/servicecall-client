import { http } from './http';

export const getServicecallApi = async (loggedUserId, loggedPrivilegeId, loggedCompanyId, limit, skip, query) => 
	await http.get(
		`/admin/servicecall/getServicecallsList?loggedUserId=${loggedUserId}&loggedPrivilegeId=${loggedPrivilegeId}&loggedCompanyId=${loggedCompanyId}&limit=${limit}&skip=${skip}&query=${query}`
	);

export const getServicecallDetailApi =  async id =>
	await http.get(
			`/admin/servicecall/${id}/detail`
		);
export const addServicecallApi = async data => {
	await http.post(`/admin/servicecall/addServicecall`, data);
}

export const updateServicecallApi = async (data, id) => {
	await http.put(`/admin/servicecall/${id}`, data);
}

export const getServicecallsDashboardApi =  async (id, loggedPrivilegeId, loggedCompanyId) =>
	await http.get(
			`/admin/servicecall/${id}/count?loggedPrivilegeId=${loggedPrivilegeId}&loggedCompanyId=${loggedCompanyId}`
		);
export const deleteServicecallApi = async id =>
	await http.delete(`/admin/servicecall/${id}/delete`);
		
//SERVICECALL COMMENTS

export const getCommentApi = async (masterId, limit, skip, query) => 
	await http.get(
		`/admin/servicecall/comment/getCommentsList?masterId=${masterId}&limit=${limit}&skip=${skip}&query=${query}`
	);
export const getCommentDetailApi =  async id =>
	await http.get(
			`/admin/servicecall/comment/${id}/detail`
		);
export const addCommentApi = async data => {
	return await http.post(`/admin/servicecall/comment/addComment`, data);
}

export const updateCommentApi = async data => {
	//await http.put(`/admin/servicecall/comment/update`, data);
	return await http.post(`/admin/servicecall/comment/updateComment`, data);
}

export const downloadImgApi = async data => {
	return await http.post(`/admin/servicecall/comment/downloadImg`, data);
	//return await http.get(`/admin/servicecall/comment/downloadImg`);
}

export const deleteCommentApi = async id => {
	return await http.delete(`/admin/servicecall/comment/${id}/delete`);
}
