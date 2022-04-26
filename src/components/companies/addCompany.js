import React from 'react';
import { Container, Button, Grid } from '@material-ui/core';
import { Form, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import useFormValidation from "../../validators/useFormValidation";
import validateAddCompany from "../../validators/validateAddCompany";
import { addCompanyAction, updateCompanyAction } from "../../redux/actions/companyActions";
import { connect } from "react-redux";

const AddCompany = (props) => {

    const { toggleModal, addCompanyAction, updateCompanyAction, editFlag, companyDbData } = props;
    
	let INITIAL_STATE = {
        companyId: companyDbData?._id,
        companyName:companyDbData?.companyName ||'',
        companyLogoUrl:companyDbData?.companyLogoUrl || '',
        companyLogoUrlOld:companyDbData?.companyLogoUrl || '',
	};
	const { handleChange, handleSubmit, values, errors } = useFormValidation(
		INITIAL_STATE,
		validateAddCompany
		);

    return (

            <>
            <Row>
                <Col xs={8}>
                <Grid container direction="column" >
                    <Form
                    onSubmit={async (e) => {
                    try {
                                if (editFlag) {
                                await handleSubmit(e, updateCompanyAction, toggleModal, true);
                                toggleModal();
                                    
                                } else {
                                    await handleSubmit(e, addCompanyAction, toggleModal, true);
                                    toggleModal();
                                }
                            
                    }
                    catch (error){ }
                    }}
                >
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                            <Form.Label>Attachment</Form.Label>
                            <FormControl
                                            name="companyName"
                                        type="text"
                                        value={values.companyName}
                                        onChange={handleChange}
                                        placeholder='Company Name'
                                    />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                            <Form.Label>Logo</Form.Label>
                            <FormControl
                                        name="companyLogoUrl"
                                        type="file"
                                        value={values.companyLogoUrl?.files?.[0]?.name}
                                        onChange={(e) => handleChange(e, false, null, true, false)}
                                    />
                            </Grid>
                        </Grid>
                        

                        <Grid container spacing={3}>
                        <Grid  item xs={12} direction="row">
                            <Row >
                                <Col xs={3}>
                                    <Button variant="contained" color="primary" type='submit'>
                                        {editFlag ? 'Update' : 'Submit'}
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

                </Col>
            {   editFlag && values.companyLogoUrlOld &&

                <Col xs={4}>
                
                <img width="200px" height="250px" src={"https://servicecalluploads.s3.ap-south-1.amazonaws.com/companyLogo/"+ values.companyLogoUrlOld} />
                        {/* <Button style={{'margin-top': '5px'}} variant="contained" color="secondary"  onClick={() => {downloadFunc("https://servicecalluploads.s3.ap-south-1.amazonaws.com/"+ values.bugAttachmentsUrlOld)}}>Download</Button> */}
                </Col>

            }
                </Row>

                
            </>

    )
}


const mapStateToProps = (state) => ({
	companyDbData: state.companyReducer.companyDetail
});


export default connect(mapStateToProps, { addCompanyAction, updateCompanyAction })(AddCompany);