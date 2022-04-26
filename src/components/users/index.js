import React, { useState } from "react";
import { Container } from '@material-ui/core';
import { connect } from "react-redux";
import PageHeading from "../common/pageHeading";
import MTable from "../common/Mtable";
import ModalComponent from "../common/modal/modal";
import AddUser from "./addUser";
import { 
	getUsers, 
	emptyUserDetails, 
	searchUsers, 
	getUserDetail
	 } from "../../redux/actions/userActions";
import * as userTypes from '../../redux/types/userTypes';
import { useFetching } from "../../Hooks/apiCall";

const Users = (props) => {

	const { users, searchUsers, getUserDetail, emptyUserDetails } = props;

 const [addUserModalState, toggleAddUserModalState] = useState(false);
 const [editUser, setEditUser] = useState(false);

 const toggleAddUserModal = async () => {
 	toggleAddUserModalState(!addUserModalState);
 	setEditUser(false);
 	await emptyUserDetails();
 }

  const editFunc = async(id) => {
 		await getUserDetail(id);
 		setEditUser(true);
 		toggleAddUserModalState(!addUserModalState);
 }

useFetching(getUsers);

	return (

		<Container className="pageContainer" >
				<PageHeading
					heading="Users"
					showButton={true}
					buttonLabel="Add User"
					showSearch={true}
					searchAction={searchUsers}
					onClick={toggleAddUserModal}
				/>

				<MTable 
					tableData={users.items}
					contentFlag={userTypes.USER_FLAG}
					editFunc={editFunc}
				/>
				<ModalComponent
					title={ editUser ? "Edit User": "Add User" }
					modalState={addUserModalState}
					message={<AddUser toggleModal={toggleAddUserModal} editFlag={editUser} />}
					toggleModal={toggleAddUserModal}
				/>

		</Container>

	)
}

const mapStateToProps = (state) => ({
	users: state.userReducer.userlist
});

const mapDipatchToProps = {
	searchUsers,
	getUserDetail,
	emptyUserDetails
}

export default connect(mapStateToProps, mapDipatchToProps)(Users);