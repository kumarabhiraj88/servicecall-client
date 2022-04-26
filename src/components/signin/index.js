import React from 'react';
import { connect } from 'react-redux';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import{ Button }  from '@material-ui/core';
import { Fingerprint, Person } from '@material-ui/icons';

import useFormValidation from '../../validators/useFormValidation';
import validateAuth from '../../validators/validateAuth';
import { authAction } from '../../redux/actions/authActions';
import { useHistory } from 'react-router-dom';


const INITIAL_STATE = {
    'Username' 	: "",
    'Password'	: ""
}

const Signin = (props) => {

    const history = useHistory();
	const { handleSubmit, handleChange, values, errors } = useFormValidation(
		INITIAL_STATE, 
		validateAuth
		);
	const { authAction } = props;

    return (
        <>
        <div className='signIn'>
            <div className='signInContainer'>
				<div className='signInForm'>

                    <div className='signInuserIcon'>
                      <Person className="headiconbg" />
					</div>
					<p>Sign In</p>
                    
                    <Form
                        onSubmit={async e => {
							try { 
								await handleSubmit(e, authAction);
								history.push('/admin/dashboard');
							} catch (error) {}
						}}
                    >
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1"><Person /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="Username"
                                type="text"
                                value={values.Username}
                                onChange={handleChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1"><Fingerprint /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="Password"
                                type="password"
                                value={values.Password}
                                onChange={handleChange}
                            />
                        </InputGroup>
                    
                        <Button variant="contained" color="primary" type='submit' fullWidth>
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
        </>
    )
}

const mapDispatchToProps = {
    authAction
}
export default connect(null, mapDispatchToProps)(Signin);