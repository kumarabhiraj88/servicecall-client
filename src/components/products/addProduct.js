import React from 'react';
import { Container, Button, Grid } from '@material-ui/core';
import { Form, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import useFormValidation from "../../validators/useFormValidation";
import validateAddProduct from "../../validators/validateAddProduct";
import { addProductAction, updateProductAction } from "../../redux/actions/productActions";
import { getCompaniesList } from "../../redux/actions/companyActions";
import { connect } from "react-redux";
import { useFetching } from "../../Hooks/apiCall";

const AddProduct = (props) => {

    const { companies, toggleModal, addProductAction, updateProductAction, editFlag, productDbData } = props;
    
	let INITIAL_STATE = {
        productId: productDbData?._id,
        companyId:productDbData.companyId?._id ||'',
        productName:productDbData?.productName ||''
	};
	const { handleChange, handleSubmit, values, errors } = useFormValidation(
		INITIAL_STATE,
		validateAddProduct
		);

        //calling the company list for dropdown on load event
        useFetching(getCompaniesList);
        
    return (
        <Container className="pageContainer">
           
           <Grid container direction="column" >
               <Form
                  onSubmit={async (e) => {
                   try {
                            if (editFlag) {
                                await handleSubmit(e, updateProductAction, toggleModal);
                            } else {
                                await handleSubmit(e, addProductAction, toggleModal);
                            }
                           
                   }
                   catch (error){ }
                   }}
               >

                   

                   <Grid item xs={6} >
                       <InputGroup className="mb-3">
                       <Form.Control 
                                as="select" 
                                name="companyId" 
                                value={values.companyId} 
                                onChange={handleChange} 
                                placeholder='Company'
                                defaultValue={values.companyId ? values.companyId : ''}
                            >
                                <option value="">Select Company</option>
                                {
                                    companies.items.map((item)=>{
                                        return  <option value={item._id}  >{item.companyName}</option>;
                                    })
                                }
                            
                            </Form.Control>
                       </InputGroup>
                   </Grid>

                   <Grid item xs={6} >
                       <InputGroup className="mb-3">
                           <FormControl
                               name="productName"
                               type="text"
                               value={values.productName}
                               onChange={handleChange}
                               placeholder='Product Name'
                           />
                       </InputGroup>
                   </Grid>

                   <Grid  direction="row">
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
               </Form>
           
       </Grid>

      

   </Container>
    )
}


const mapStateToProps = (state) => ({
	productDbData: state.productReducer.productDetail,
	companies: state.commonReducer.companylist
});


export default connect(mapStateToProps, { addProductAction, updateProductAction })(AddProduct);