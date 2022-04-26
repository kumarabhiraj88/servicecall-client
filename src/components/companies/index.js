import React, { useState } from "react";
import { Container } from '@material-ui/core';
import { connect } from "react-redux";
import PageHeading from "../common/pageHeading";
import MTable from "../common/Mtable";
import ModalComponent from "../common/modal/modal";
import AddCompany from "./addCompany";
import { 
	getCompanies, 
	emptyCompanyDetails, 
	searchCompanies, 
	getCompanyDetail
	 } from "../../redux/actions/companyActions";
import * as companyTypes from '../../redux/types/companyTypes';
import { useFetching } from "../../Hooks/apiCall";

const Companies = (props) => {

const { companies, searchCompanies, getCompanyDetail, emptyCompanyDetails } = props;
	

 const [addCompanyModalState, toggleAddCompanyModalState] = useState(false);
 const [editCompany, setEditCompany] = useState(false);

 const toggleAddCompanyModal = async () => {
 	toggleAddCompanyModalState(!addCompanyModalState);
 	setEditCompany(false);
 	await emptyCompanyDetails();
 }

  const editFunc = async(id) => {
 		await getCompanyDetail(id);
 		setEditCompany(true);
 		toggleAddCompanyModalState(!addCompanyModalState);
 }

useFetching(getCompanies);

	return (

		<Container className="pageContainer" >
				<PageHeading
					heading="Companies"
					showButton={true}
					buttonLabel="New"
					showSearch={true}
					searchAction={searchCompanies}
					onClick={toggleAddCompanyModal}
				/>
				
				<MTable 
					tableData={companies.items}
					contentFlag={companyTypes.COMPANY_FLAG}
					editFunc={editFunc}
				/>
				<ModalComponent
					modalClassName={editCompany ? "modal-dialog-editcompany" : ""}
					title={ editCompany ? "Edit Company": "Add Company" }
					modalState={addCompanyModalState}
					message={<AddCompany toggleModal={toggleAddCompanyModal} editFlag={editCompany} />}
					toggleModal={toggleAddCompanyModal}
				/>

		</Container>

	)
}

const mapStateToProps = (state) => ({
	companies: state.companyReducer.companylist
});

const mapDipatchToProps = {
	searchCompanies,
	getCompanyDetail,
	emptyCompanyDetails
}

export default connect(mapStateToProps, mapDipatchToProps)(Companies);