import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container } from '@material-ui/core';
import { connect } from "react-redux";
import PageHeading from "../common/pageHeading";
import MTable from "../common/Mtable";
import ModalComponent from "../common/modal/modal";
import AddServicecall from "./addServicecall";
import { 
	getServicecalls, 
	emptyServicecallDetails, 
	searchServicecalls, 
	getServicecallDetail,
	deleteServicecall
	 } from "../../redux/actions/servicecallActions";
import * as servicecallTypes from '../../redux/types/servicecallTypes';
import { useFetching } from "../../Hooks/apiCall";

const Servicecalls = (props) => {
	const history = useHistory();
	const { servicecalls, searchServicecalls, getServicecallDetail, emptyServicecallDetails, deleteServicecall } = props;

 const [addServicecallModalState, toggleaddServicecallModalState] = useState(false);
 const [editServicecall, setEditServicecall] = useState(false);

 const toggleAddServicecallModal = async () => {
 	toggleaddServicecallModalState(!addServicecallModalState);
 	setEditServicecall(false);
 	await emptyServicecallDetails();
 }



 const scDetailedPage = async (id, companyId) => {
	await getServicecallDetail(id);
	 setEditServicecall(true);
	history.push(`/admin/servicecalls/${id}/detail/${companyId}`);
};

useFetching(getServicecalls);

	return (

		<Container className="pageContainer" >
				<PageHeading
					heading="Servicecalls"
					showButton={true}
					buttonLabel="New"
					showSearch={true}
					searchAction={searchServicecalls}
					onClick={toggleAddServicecallModal}
				/>
			
				<MTable 
					tableData={servicecalls.items}
					contentFlag={servicecallTypes.SERVICECALL_FLAG}
					detailedPage={scDetailedPage}
					deleteFunc={deleteServicecall}
					exportFlag='yes'
				/>
				<ModalComponent
					title={"Add Servicecall" }
					modalState={addServicecallModalState}
					message={<AddServicecall toggleModal={toggleAddServicecallModal} editFlag={editServicecall} />}
					toggleModal={toggleAddServicecallModal}
				/>


		</Container>

	)
}

const mapStateToProps = (state) => ({
	servicecalls: state.servicecallReducer.servicecalllist
});

const mapDipatchToProps = {
	searchServicecalls,
	getServicecallDetail,
	emptyServicecallDetails,
	deleteServicecall
}

export default connect(mapStateToProps, mapDipatchToProps)(Servicecalls);