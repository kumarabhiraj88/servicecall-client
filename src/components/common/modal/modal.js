import React from 'react';
import { Button } from '@material-ui/core';
import{ Modal }  from 'react-bootstrap';


const ModalComponent = (props) => {

		const { 
			modalState, 
			title, 
			message,
			toggleModal,
			buttonColor,
			buttonLabel,
			showButtons = false,
			onClick,
			modalClassName
		 } = props;

	const toggle = () => toggleModal(!modalState);	 


	//onHide will invoke only if closeButton is clicked (it is a default process)

	return(
		<>
			<Modal show={modalState} onHide={toggle} dialogClassName={modalClassName}>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>

				<Modal.Body > 
					{message}
				</Modal.Body>
			{showButtons && (
				<Modal.Footer>
					<Button  variant="secondary" onClick={toggle}>Close</Button>
					<Button onClick={onClick} variant="primary">{buttonLabel}</Button>
				</Modal.Footer>
			)}
			</Modal>
			

		</>
	)
}

export default ModalComponent;