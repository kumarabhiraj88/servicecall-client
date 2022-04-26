import React from 'react';
import { Container, Button, Grid } from '@material-ui/core';
import { Form, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import useFormValidation from "../../../validators/useFormValidation";
import validateChangePassword from "../../../validators/validateChangePassword";
import { updatePasswordAction } from "../../../redux/actions/userActions";
import { connect } from "react-redux";

const ChangePasswordModal = (props) => {
	const { toggleModal, updatePasswordAction, userId } = props;
	let INITIAL_STATE = {
		Password: '',
		cpassword: '',
		userId
	};
	const { handleChange, handleSubmit, values, errors } = useFormValidation(
		INITIAL_STATE,
		validateChangePassword
		);


	return (
		

		<Container className="pageContainer" >
           
                <Grid container direction="column" >
                    <Form
                       onSubmit={async (e) => {
						try {
								await handleSubmit(e, updatePasswordAction, toggleModal);
								
						}
						catch (error){ }
						}}
                    >

                        <Grid item xs={6} >
                            <InputGroup className="mb-3">
                                <FormControl
                                    name="Password"
                                    type="password"
                                    value={values.Password}
                                    onChange={handleChange}
									placeholder='New Password'
                                />
                            </InputGroup>
                        </Grid>

                        <Grid item xs={6} >
                            <InputGroup className="mb-3">
                                <FormControl
                                    name="cpassword"
                                    type="password"
                                    value={values.cpassword}
                                    onChange={handleChange}
									placeholder='Confirm Password'
                                />
                            </InputGroup>
                        </Grid>

                        <Grid  direction="row">
                            <Row >
                                <Col xs={3}>
                                    <Button variant="contained" color="primary" type='submit'>
                                        Change
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

		);
};


export default connect(null, { updatePasswordAction })(ChangePasswordModal);