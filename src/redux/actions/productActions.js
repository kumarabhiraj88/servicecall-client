import * as productServices  from '../services/productServices';
import * as productTypes from '../types/productTypes';
import { useHistory } from "react-router-dom";


export const getProducts = (limit = 10, skip = 0, query = '', pagination=true) => async dispatch => {
	try{  
		 const { data } = await productServices.getProductsApi(limit, skip, query, pagination);
		 dispatch({
			type: productTypes.GET_PRODUCTS,
			payload: data.data.items,
			productCount: data.data.total
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


export const getProductsList = (id) => async dispatch => {
	const { data } = await productServices.getProductsListApi(id);
	dispatch({
		type: productTypes.GET_PRODUCTS,
		payload: data.data
	});
}

//search product
export const searchProducts = (query) => async dispatch => {
	getProducts(10, 0, query)(dispatch);
}
//create new product
export const addProductAction = payload => async dispatch => {
			await productServices.addProductApi(payload);
			getProducts()(dispatch);
};

//update product
export const updateProductAction = body => async dispatch => {
	let id = body.productId;
	await productServices.updateProductApi(body, id);
	getProducts()(dispatch);
};

//get product details
export const getProductDetail = (id) => async dispatch => {
	try {
			const {data} = await productServices.getProductDetailApi(id);
			dispatch({
				type: productTypes.GET_PRODUCT_DETAILS,
				payload: data.data
			})
	}
	catch (err) {
			throw err;
	}
};

export const emptyProductDetails = () => async dispatch => {
	dispatch({
		type: productTypes.EMPTY_PRODUCT_DETAILS
	});
}







