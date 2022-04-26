import React, { useState } from "react";
import { Container } from '@material-ui/core';
import { connect } from "react-redux";
import PageHeading from "../common/pageHeading";
import MTable from "../common/Mtable";
import ModalComponent from "../common/modal/modal";
import AddProduct from "./addProduct";
import { 
	getProducts, 
	emptyProductDetails, 
	searchProducts, 
	getProductDetail
	 } from "../../redux/actions/productActions";
import * as productTypes from '../../redux/types/productTypes';
import { useFetching } from "../../Hooks/apiCall";

const Products = (props) => {

	const { products, searchProducts, getProductDetail, emptyProductDetails } = props;

 const [addProductModalState, toggleaddProductModalState] = useState(false);
 const [editProduct, setEditProduct] = useState(false);

 const toggleAddProductModal = async () => {
 	toggleaddProductModalState(!addProductModalState);
 	setEditProduct(false);
 	await emptyProductDetails();
 }

  const editFunc = async(id) => {
 		await getProductDetail(id);
 		setEditProduct(true);
 		toggleaddProductModalState(!addProductModalState);
 }

useFetching(getProducts);

	return (

		<Container className="pageContainer" >
				<PageHeading
					heading="Products"
					showButton={true}
					buttonLabel="New"
					showSearch={true}
					searchAction={searchProducts}
					onClick={toggleAddProductModal}
				/>
			
				<MTable 
					tableData={products.items}
					contentFlag={productTypes.PRODUCT_FLAG}
					editFunc={editFunc}
				/>
				<ModalComponent
					title={ editProduct ? "Edit Product": "Add Product" }
					modalState={addProductModalState}
					message={<AddProduct toggleModal={toggleAddProductModal} editFlag={editProduct} />}
					toggleModal={toggleAddProductModal}
				/>

		</Container>

	)
}

const mapStateToProps = (state) => ({
	products: state.productReducer.productlist
});

const mapDipatchToProps = {
	searchProducts,
	getProductDetail,
	emptyProductDetails
}

export default connect(mapStateToProps, mapDipatchToProps)(Products);