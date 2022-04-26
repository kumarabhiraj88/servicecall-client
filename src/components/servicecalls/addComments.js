import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid } from '@material-ui/core';
import { Form, FormControl, Row, Col } from 'react-bootstrap';
import useFormValidation from "../../validators/useFormValidation";
import validateAddComments from "../../validators/validateAddComments";
import { addCommentAction, updateCommentAction, downloadImgAction } from "../../redux/actions/servicecallActions";
//import { Link } from 'react-router-dom';

const AddComments = (props) => {
		const {
			toggleModal,
			addCommentAction,
            updateCommentAction,
            downloadImgAction,
			editFlag,
            masterId,
            commentDbData
		} = props;

	let INITIAL_STATE = {
        commentId:commentDbData._id,
		bugDescription: commentDbData?.bugDescription || '',
		masterId: commentDbData?.masterId || masterId,
        bugAttachmentsUrl:commentDbData?.bugAttachmentsUrl || '',
        bugAttachmentsUrlOld:commentDbData?.bugAttachmentsUrl || '',
        updatedBy: localStorage.getItem('loggeduserid')
	}
   
	const { handleChange, handleSubmit, values, errors } = useFormValidation(
		INITIAL_STATE,
		validateAddComments
		);

        // function download(imgUrl) {
        //     // var link = document.createElement('a');
        //     // link.download = imgUrl;
        //     // document.body.appendChild(link);
        //     // link.click();
        //     // document.body.removeChild(link);

        //     const url = window.URL.createObjectURL(new Blob(['https://servicecalluploads.s3.ap-south-1.amazonaws.com/']));
        //     // const url = window.URL.createObjectURL(new Blob(['https://servicecalluploads.s3.ap-south-1.amazonaws.com/'], { type: 'image/png' }));
        //     const link = document.createElement('a');
        //     link.href = url;
        //     link.setAttribute('download', values.bugAttachmentsUrlOld);
        //     document.body.appendChild(link);
        //     link.click();
        // }

        //https://www.youtube.com/watch?v=hjtTWw7XWiQ

      
        const downloadFunc = async(imgUrl) => {
  
			const { data } = await downloadImgAction(imgUrl);
            
            //const url = window.URL.createObjectURL(new Blob([data],{ type: "image/*"} ));
            const url = window.URL.createObjectURL(new Blob([data] ));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', values.bugAttachmentsUrlOld);
            document.body.appendChild(link);
            link.click();

	    }


	return (
		<>
        <Row>
            <Col xs={8}>
			<Grid container direction="column" >
				<Form
                  onSubmit={async (e) => {
                   try {
                            if (editFlag) {
                               await handleSubmit(e, updateCommentAction, toggleModal, true);
                               toggleModal();
                                
                            } else {
                                await handleSubmit(e, addCommentAction, toggleModal, true);
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
                            name="bugAttachmentsUrl"
                            type="file"
                            value={values.bugAttachmentsUrl?.files?.[0]?.name}
                            onChange={(e) => handleChange(e, false, null, true, false)}
                         />
                        </Grid>
					</Grid>

					<Grid container spacing={3}>
                        <Grid item xs={12}>
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
{/* {   editFlag && values.bugAttachmentsUrlOld &&

            <Col xs={4}>
               
                    <img width="200px" height="250px" src={"https://servicecalluploads.s3.ap-south-1.amazonaws.com/"+ values.bugAttachmentsUrlOld} />
                    <Button style={{'margin-top': '5px'}} variant="contained" color="secondary"  onClick={() => {downloadFunc("https://servicecalluploads.s3.ap-south-1.amazonaws.com/"+ values.bugAttachmentsUrlOld)}}>Download</Button>
            </Col>

} */}
            </Row>

            
		</>
	)
}

const mapStateToProps = (state) => ({
	commentDbData: state.servicecallReducer.commentDetail
});

export default connect(mapStateToProps, { addCommentAction, updateCommentAction, downloadImgAction }) (AddComments);
