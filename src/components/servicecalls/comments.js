import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PageHeading from "../common/pageHeading";
import MTable from "../common/Mtable";
import ModalComponent from "../common/modal/modal";
import AddComment from "./addComments";
import OpenFileModalPage from "./openFileViewPage";
import { 
	getComments, 
	emptyCommentDetails, 
	getCommentDetail,
	deleteComment
	 } from "../../redux/actions/servicecallActions";
import * as servicecallTypes from '../../redux/types/servicecallTypes';

const Comments = (props) => {

	const { comments, deleteComment, getComments, getCommentDetail, emptyCommentDetails, masterId } = props;

	const [addCommentModalState, toggleaddCommentModalState] = useState(false);
	const [editComment, setEditComment] = useState(false);
	const [openFileModalState, toggleOpenFileModalState] = useState(false);
   
	const toggleAddCommentModal = async () => {
		toggleaddCommentModalState(!addCommentModalState);
		setEditComment(false);
		await emptyCommentDetails();
	}
	
	const toggleOpenFileModal = async (id) => {
		if(id){
			await getCommentDetail(id);
		}
		await toggleOpenFileModalState(!openFileModalState);
   }
   
	 const editFunc = async(id) => {
			await getCommentDetail(id);
			setEditComment(true);
			toggleaddCommentModalState(!addCommentModalState);
	}



	useEffect(()=>{
		//here, length is not checking bcz everytime need different values based on the masterId
		//if(comments.items.length === 0) {	
			getComments(masterId)
		//}
		
		
	}, []);



	return (
			<>

				<PageHeading
					heading="Comments"
					showButton={true}
					buttonLabel="Post Comment"
					onClick={toggleAddCommentModal}
				/>
			
				<MTable 
					tableData={comments.items}
					contentFlag={servicecallTypes.COMMENTS_FLAG}
					editFunc={editFunc}
					filePopupPage={toggleOpenFileModal}
					deleteFunc={deleteComment}
				/>

				<ModalComponent
					modalClassName={editComment ? "modal-dialog-editcomment" : ""}
					title={ editComment ? "Edit Comment": "Add Comment" }
					modalState={addCommentModalState}
					message={<AddComment masterId={masterId} toggleModal={toggleAddCommentModal} editFlag={editComment} />}
					toggleModal={toggleAddCommentModal}
				/>

				<ModalComponent
					modalClassName={"modal-dialog-fileview-comment"}
					title={"File Attached" }
					modalState={openFileModalState}
					message={<OpenFileModalPage toggleModal={toggleOpenFileModal} />}
					toggleModal={toggleOpenFileModal}
				/>


			</>

	)
}

const mapStateToProps = (state) => ({
	comments: state.servicecallReducer.commentlist
});

const mapDipatchToProps = {
	getComments,
	getCommentDetail,
	emptyCommentDetails,
	deleteComment
}

export default connect(mapStateToProps, mapDipatchToProps)(Comments);