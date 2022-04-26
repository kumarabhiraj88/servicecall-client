import { http } from './http';

export const getCompaniesApi = async (limit, skip, query) => 
	await http.get(
		`/admin/company/getCompaniesList?limit=${limit}&skip=${skip}&query=${query}`
	);
export const getCompanyDetailApi =  async id =>
	await http.get(
			`/admin/company/${id}/detail`
		);
export const addCompanyApi = async data => {
	await http.post(`/admin/company/addCompany`, data);
}

export const updateCompanyApi = async (data, id) => {
	//await http.put(`/admin/company/${id}`, data);
	return await http.post(`/admin/company/updateCompany`, data);
}
