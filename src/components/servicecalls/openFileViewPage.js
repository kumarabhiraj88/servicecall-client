import React, { useEffect, useState } from 'react';
import { Container, Button, Grid, Card } from '@material-ui/core';
import { Form, FormControl, Row, Col } from 'react-bootstrap';
import * as servicecallTypes from "../../redux/types/servicecallTypes";
import { connect } from "react-redux";
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;




const OpenFileViewPage = (props) => {

    const loggedPrivilegeId = localStorage.getItem('privilegeId');

    const { 
            toggleModal, 
            commentsDbData 
        } = props;


const fileExtension=(commentsDbData.bugAttachmentsUrl).split('.').pop();

const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

    return (
        <Container className="pageContainer">
           
           <Grid container direction="column" >
              
                    <Grid container spacing={3}>
						<Grid item xs >
                            {
                                //The <object> tag defines a container for an external resource.
                                //The external resource can be a web page, a picture, a media player, or a plug-in application.
                                // fileExtension=='pdf'? <object data={'https://servicecalluploads.s3.ap-south-1.amazonaws.com/'+commentsDbData.bugAttachmentsUrl} type="application/pdf" width="100%" height="100%"><p>{commentsDbData.bugAttachmentsUrl}</p></object>
                                // : <Card><img src={'https://servicecalluploads.s3.ap-south-1.amazonaws.com/'+commentsDbData.bugAttachmentsUrl}  /></Card> 


                                fileExtension=='pdf'? <Card><Document file={'https://servicecalluploads.s3.ap-south-1.amazonaws.com/'+commentsDbData.bugAttachmentsUrl}  onLoadSuccess={onDocumentLoadSuccess}   ><Page pageNumber={pageNumber} /></Document></Card>
                                : <Card><img src={'https://servicecalluploads.s3.ap-south-1.amazonaws.com/'+commentsDbData.bugAttachmentsUrl}  /></Card> 
                            }
                           
                                
                        </Grid>
                    </Grid>
                   
                   <Grid container spacing={3}>
                    <Grid  item xs direction="row">
                        <Row >
                            <Col xs={3}>
                                <Button variant="contained" color="primary" onClick={() => {
                                        toggleModal('')
                                    }} >
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                   </Grid>
           
       </Grid>

      

   </Container>
    )
}


const mapStateToProps = (state) => ({
	commentsDbData: state.servicecallReducer.commentDetail,
});

const mapDispatchToProps={
   // addServicecallAction,
}


export default connect(mapStateToProps, mapDispatchToProps)(OpenFileViewPage);