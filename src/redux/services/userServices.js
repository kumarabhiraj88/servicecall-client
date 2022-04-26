import { http } from './http';

export const updatePasswordApi = async(data) =>{
   return await http.post('/admin/user/update-password', data);
}

export const getUsersApi = async (limit, skip, query) => 
	await http.get(
		`/admin/user/getUsersList?limit=${limit}&skip=${skip}&query=${query}`
	);
export const getImplementorsApi = async (data) => 
	await http.get(
		`/admin/user/getImplementorsList`
	);
export const getUserDetailApi =  async id =>
	await http.get(
			`/admin/user/${id}/detail`
		);
export const addUserApi = async data => {
	await http.post(`/admin/user/addUser`, data);
}

export const updateUserApi = async (data, id) => {
	await http.put(`/admin/user/${id}`, data);
}

export const userEnableDisableApi = async (id, status) =>{
	(status === 0)? status=1: status=0;
	await http.delete(`/admin/user/userEnableDisable/${id}/${status}`);
}