import React, { useEffect } from 'react';
import moment from 'moment';
import { Container, Button, Grid } from '@material-ui/core';
import { Form, FormControl, Row, Col } from 'react-bootstrap';
import useFormValidation from "../../validators/useFormValidation";
import validateAddServicecall from "../../validators/validateAddServicecall";
import { addServicecallAction, updateServicecallAction } from "../../redux/actions/servicecallActions";
import * as servicecallTypes from "../../redux/types/servicecallTypes";
import { getCompaniesList } from "../../redux/actions/companyActions";
import { getProductsList } from "../../redux/actions/productActions";
import { getImplementorsList } from "../../redux/actions/userActions";
import { connect } from "react-redux";
//mport { useFetching } from "../../Hooks/apiCall";

//import "react-datepicker/dist/react-datepicker.css"; is included in the App.js file
import DatePicker from "react-datepicker";

const AddServicecall = (props) => {

    const loggedPrivilegeId = localStorage.getItem('privilegeId');
    const loggedCompanyId = localStorage.getItem('loggedCompanyId');


    const { 
            companies, 
            products,
            implementors,
            getCompaniesList,
            getProductsList, 
            getImplementorsList,
            toggleModal, 
            addServicecallAction, 
            updateServicecallAction, 
            editFlag, 
            servicecallDbData 
        } = props;

	let INITIAL_STATE = {
        servicecallId: servicecallDbData?._id,
        companyId:servicecallDbData.companyId?._id || (loggedCompanyId? loggedCompanyId :''),
        productId:servicecallDbData.productId?._id ||'',
        assignedTo:servicecallDbData.assignedTo?._id ||'',
        bugStatus:servicecallDbData?.bugStatus || 0,
        expectedCompletionDate: servicecallDbData?.expectedCompletionDate ||  '',
		bugAttachmentsUrl: servicecallDbData?.bugAttachmentsUrl,
		bugChild: servicecallDbData?.bugChild || '',
        filedBy: localStorage.getItem('loggeduserid')
	};

	const { handleChange, handleSubmit, values, errors } = useFormValidation(
		INITIAL_STATE,
		validateAddServicecall
		);

    //calling the company list for dropdown on load event
    //useFetching(getCompaniesList);

   //useFetching(getImplementorsList);

   useEffect(()=>{
    if(companies.items.length === 0) {			
        getCompaniesList();
    }

    if(implementors.items.length === 0) {
        getImplementorsList();
    }

    if(loggedCompanyId!="" && loggedPrivilegeId=='3'){
        getProductsList(loggedCompanyId);
    }
    
    
}, [])

    return (
        <Container className="pageContainer">
           
           <Grid container direction="column" >
               <Form
                  onSubmit={async (e) => {
                   try {
                            if (editFlag) {
                                await handleSubmit(e, updateServicecallAction, toggleModal, true);
                            } else {
                                await handleSubmit(e, addServicecallAction, toggleModal, true);
                            }
                           
                   }
                   catch (error){ }
                   }}
               >

                    <Grid container spacing={3}>
						<Grid item xs>
						<Form.Label>Company</Form.Label>
                        <Form.Control 
                                as="select" 
                                name="companyId" 
                                value={values.companyId} 
                                disabled={loggedPrivilegeId =='3' ? true : null}
                               // onChange={handleChange} 
                                onChange={(e)=> { handleChange(e); getProductsList(e.target.value); }} 
                                defaultValue={values.companyId ? values.companyId : ''}
                            >
                                <option value="">Select Company</option>
                                {
                                    companies.items.map((item)=>{
                                        
                                            return  <option value={item._id}  >{item.companyName}</option>;
                                       
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
                                defaultValue={values.productId ? values.productId : ''}
                            >
                                <option value="">Select Product</option>
                                {
                                    products.items.map((item)=>{
                                        return  <option value={item._id}  >{item.productName}</option>;
                                    })
                                }
                            
                        </Form.Control>
                        </Grid>
                        
                    </Grid>
                   
                    <Grid container spacing={3}>
						<Grid item xs>
                        <Form.Label>Assigned To</Form.Label>
                        <Form.Control 
                                as="select" 
                                name="assignedTo" 
                                value={values.assignedTo} 
                                onChange={handleChange} 
                                placeholder='Assigned To'
                                disabled={loggedPrivilegeId !='1' ? true : false}
                                defaultValue={values.assignedTo ? values.assignedTo : ''}
                            >
                                <option value="">Assigned To</option>
                                {
                                    implementors.items.map((item)=>{
                                        return  <option value={item._id}  >{item.fullName}</option>;
                                    })
                                }
                            
                        </Form.Control>
                        </Grid>

                        <Grid item xs>
                        <Form.Label>Status</Form.Label>
                        <Form.Control 
                                as="select" 
                                name="bugStatus" 
                                value={values.bugStatus} 
                                onChange={handleChange} 
                                placeholder='Privilege'
                                defaultValue={values.bugStatus ? values.bugStatus : ''}
                                disabled={ true }
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

                    <Grid container spacing={3}>
						<Grid item xs>
                        <Form.Label>Attachment</Form.Label>
                        <FormControl
                            name="bugAttachmentsUrl"
                            type="file"
                            value={values.bugAttachmentsUrl?.files?.[0]?.name}
                            onChange={(e) => handleChange(e, false, null, true, false)}
                         />
                        </Grid>

                        <Grid item xs>
                        <Form.Label>Expected Completion Date</Form.Label>
                       
                        <DatePicker 
							name="expectedCompletionDate"
							value={values.expectedCompletionDate ? moment(values.expectedCompletionDate).format('DD-MM-YYYY'): ''}
							//onChange={(e) => handleChange(e, false, null, false, false, true)}
							onChange={(value, event) => {
								event.target = {type:"text", value:value, name:"expectedCompletionDate"}
								handleChange(event, false, null, false, false)
							  }}
							dateFormat="DD-MM-YYYY"
                            autoComplete="none"
						/>
						
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
						<Grid item xs>
                        <Form.Label>Description</Form.Label>
                        <FormControl
                            name="bugDescription"
                            as="textarea"
                            rows={3}
                            value={values.bugDescription}
                            onChange={handleChange}
                            placeholder='Description'
                        />
                        </Grid>
                    </Grid>
                   
                   <Grid container spacing={3}>
                    <Grid  item xs direction="row">
                        <Row >
                            <Col xs={3}>
                                <Button variant="contained" color="primary" type='submit'>
                                    Submit
                                </Button>
                            </Col>
                            <Col xs={3}>
                                <Button variant="contained" color="primary" onClick={toggleModal}>
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                   </Grid>

               </Form>
           
       </Grid>

      

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
    addServicecallAction,
    updateServicecallAction
}


export default connect(mapStateToProps, mapDispatchToProps)(AddServicecall);