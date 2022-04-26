import * as companyServices  from '../services/companyServices';
import * as companyTypes from '../types/companyTypes';
import { useHistory } from "react-router-dom";


export const getCompanies = (limit = 10, skip = 0, query = '', pagination=true) => async dispatch => {
	try{  
		 const { data } = await companyServices.getCompaniesApi(limit, skip, query, pagination);
		 dispatch({
			type: companyTypes.GET_COMPANIES,
			payload: data.data.items,
			companyCount: data.data.total
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

//get companylist for dropdown
export const getCompaniesList = (query) => async dispatch => {
	getCompanies(10, 0, query, false)(dispatch);
}

//search company
export const searchCompanies = (query) => async dispatch => {
	getCompanies(10, 0, query)(dispatch);
}
//create new company
export const addCompanyAction = payload => async dispatch => {
			await companyServices.addCompanyApi(payload);
			getCompanies()(dispatch);
};

//update company
export const updateCompanyAction = body => async dispatch => {
	//let id = body.companyId;
	//await companyServices.updateCompanyApi(body, id);
	await companyServices.updateCompanyApi(body);
	getCompanies()(dispatch);
};

//get company details
export const getCompanyDetail = (id) => async dispatch => {
	try {
			const {data} = await companyServices.getCompanyDetailApi(id);
			dispatch({
				type: companyTypes.GET_COMPANY_DETAILS,
				payload: data.data
			})
	}
	catch (err) {
			throw err;
	}
};

export const emptyCompanyDetails = () => async dispatch => {
	dispatch({
		type: companyTypes.EMPTY_COMPANY_DETAILS
	});
}







