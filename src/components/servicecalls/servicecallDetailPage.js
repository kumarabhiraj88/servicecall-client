import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Container, Grid } from '@material-ui/core';
//import { withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { connect, useDispatch } from "react-redux";
import PageHeading from "../common/pageHeading";
import useFormValidation from "../../validators/useFormValidation";
import validateAddServicecall from "../../validators/validateAddServicecall";
import { getServicecallDetail, updateServicecallAction } from "../../redux/actions/servicecallActions";
import * as servicecallTypes from "../../redux/types/servicecallTypes";
import { getCompaniesList } from "../../redux/actions/companyActions";
import { getProductsList } from "../../redux/actions/productActions";
import { getImplementorsList } from "../../redux/actions/userActions";
import Comments from "./comments";

//import "react-datepicker/dist/react-datepicker.css"; is included in the App.js file
import DatePicker from "react-datepicker";



const ServicecallDetailPage = (props) => {

	const loggedPrivilegeId = localStorage.getItem('privilegeId');
    const loggedCompanyId = localStorage.getItem('loggedCompanyId');
	

	const { 
			companies, 
			products, 
			implementors, 
			getCompaniesList, 
			getProductsList, 
			getImplementorsList, 
			updateServicecallAction, 
			servicecallDbData
		  } = props;
	
		

	let INITIAL_STATE = {
        servicecallId: servicecallDbData?._id || '',
		bugId: servicecallDbData?.bugId || '',
        companyId:servicecallDbData.companyId?._id ||'',
        productId:servicecallDbData.productId?._id ||'',
        assignedTo:servicecallDbData.assignedTo?._id ||'',
        bugStatus:servicecallDbData?.bugStatus || 0,
        expectedCompletionDate: servicecallDbData?.expectedCompletionDate ||'',
		attachment: servicecallDbData?.attachment,
		bugChild: servicecallDbData?.bugChild || '',
	};

	const { handleChange, handleSubmit, values = INITIAL_STATE, errors } = useFormValidation(
		INITIAL_STATE,
		validateAddServicecall
		);
	
		// const [disabledField, setDisabledField] = useState(null);
		// if(loggedPrivilegeId== '2'){
		// 	setDisabledField(true);
		// }
		// else{
		// 	setDisabledField(null);
		// };
		// //console.log(disabledField);

		let disabledField=null;
		if(loggedPrivilegeId== '2'){
			disabledField=true;
		}
		else{
			disabledField=null;
		};
		
		// const [addCommentsModalState, toggleAddCommentsModalState] = useState(false);
		// const [editComment, setEditComment] = useState(false);
 		// const toggleAddCommentsModal = async () => {
 		// 	toggleAddCommentsModalState(!addCommentsModalState);
		// 	setEditComment(false);
 		// 	await emptyCommentDetails();
 		// }


	useEffect(()=>{
		
		if(companies.items.length === 0) {			
			getCompaniesList();
		}

		if(implementors.items.length === 0) {
			getImplementorsList();
		}
		
	}, [])

	


	//if you are on react-router-dom ^5.1.1 then you could use the useParams
	const {id, companyId} = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getServicecallDetail(id));
	}, [dispatch, id]);


	useEffect(()=>{
		getProductsList(companyId);
	}, [])

	

	const updateFunction = async(e) =>{
		await handleSubmit(e, updateServicecallAction);
	}


	
	return (
		<Container className="pageContainer">
			<PageHeading
					heading="Servicecall Details"
					showButton={true}
					buttonLabel="Update"
					showBackButton={true}
					backButtonUrl={'/admin/servicecalls'}
					onClick={updateFunction}
				/>


			<Form style={{ 'padding-bottom':'10px'}} >
				   <Grid item xs={12} >
				   <Form.Label>Servicecall Id</Form.Label>
				   <InputGroup className="mb-3">
				   
                       <FormControl 
					   			 readOnly
                                 name="bugId" 
								 value={'SC'+ values.bugId } 
								 onChange={handleChange} 
								 placeholder='Bug Id'
                            />
                               
					</InputGroup>
				   </Grid>
				   <Grid container spacing={3}>
						<Grid item xs>
						<Form.Label>Company</Form.Label>
						<Form.Control 
									as="select" 
									name="companyId" 
									value={values.companyId} 
									disabled={loggedPrivilegeId !='1' ? true : null}
								// onChange={handleChange} 
									onChange={(e)=> { handleChange(e); getProductsList(e.target.value); }} 
									placeholder='Company'
									defaultValue={values.companyId ? values.companyId : ''}
								>
									<option value="">Select Company</option>
									{
										companies.items.map((item)=>{
											return  <option key={item._id}   value={item._id}  >{item.companyName}</option>;
										})
									}
								
								</Form.Control>

						</Grid>
						<Grid item xs>
						<Form.Label>Product</Form.Label>
						<Form.Control 
									as="select" 
									name="productId" 
									value={values.productId} 
									onChange={handleChange} 
									placeholder='Company'
									disabled={disabledField}
									defaultValue={values.productId ? values.productId : ''}
								>
									<option value="">Select Product</option>
									{
										products.items.map((item)=>{
											return  <option key={item._id}  value={item._id}  >{item.productName}</option>;
										})
									}
								
								</Form.Control>
						</Grid>
						<Grid item xs>
						<Form.Label>Expected Completion Date</Form.Label>
						<DatePicker 
							disabled={disabledField}
							name="expectedCompletionDate"
							value={values.expectedCompletionDate ? moment(values.expectedCompletionDate).format('DD-MM-YYYY'): ''}
							//onChange={(e) => handleChange(e, false, null, false, false, true)}
							onChange={(value, event) => {
								event.target = {type:"text", value:value, name:"expectedCompletionDate"}
								handleChange(event, false, null, false, false)
							  }}
							dateFormat="DD-MM-YYYY"
						/>
						
							{/* <FormControl
								name="expectedCompletionDate"
								type="date"
								value={moment(values.expectedCompletionDate, 'MM-DD-YYYY')}
								//value={values.expectedCompletionDate? moment(values.expectedCompletionDate).format('DD-MM-YYYY') : new Date()}
								onChange={handleChange}
							/> */}
						</Grid>
				   </Grid>

				   <Grid container spacing={3}>
						<Grid item xs={4}>
						<Form.Label>Assigned To</Form.Label>
							<Form.Control 
                                as="select" 
                                name="assignedTo" 
                                value={values.assignedTo} 
                                onChange={handleChange} 
								disabled={loggedPrivilegeId !='1' ? true : false}
                                defaultValue={values.assignedTo ? values.assignedTo : ''}
                            >
                                <option value="">Assigned To</option>
                                {
                                    implementors.items.map((item)=>{
                                        return  <option key={item._id} value={item._id}  >{item.fullName}</option>;
                                    })
                                }
                            
                            </Form.Control>
						</Grid>

						<Grid item xs={4}>
						<Form.Label>Status</Form.Label>
							<Form.Control 
                                as="select" 
                                name="bugStatus" 
                                value={values.bugStatus} 
                                onChange={handleChange} 
                                placeholder='Privilege'
                                defaultValue={values.bugStatus ? values.bugStatus : ''}
                            >
                                <option value="">Select Status</option>
                                {
                                    servicecallTypes.bug_status.map((item)=>{
                                        if(loggedPrivilegeId=='3' && (item._id!='0' && item._id!='5' && item._id!='6')){ return false; }
										else if(loggedPrivilegeId=='2' && (item._id=='0' || item._id=='5' || item._id=='6')){ return false; }
                                        else{
                                            return  <option value={item._id}  >{item.Status}</option>;
                                        }
                                    })
                                }
                            
                            </Form.Control>
						</Grid>
						
						
				   </Grid>

			</Form>  

				
			{ (values.servicecallId) && <Comments masterId={values.servicecallId} /> }

	   </Container>
	)
}

const mapStateToProps = (state) => ({
	servicecallDbData: state.servicecallReducer.servicecallDetail,
	companies: state.commonReducer.companylist,
    products: state.commonReducer.productlist,
    implementors: state.commonReducer.implementorlist
});

const mapDispatchToProps={
	getCompaniesList, 
	getProductsList, 
	getImplementorsList,
	updateServicecallAction,
	
}


export default connect(mapStateToProps, mapDispatchToProps)(ServicecallDetailPage);

//export default withRouter(
//connect(mapStateToProps, mapDispatchToProps) (ServicecallDetailPage)
//);