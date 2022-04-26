import React from 'react';
import { Switch } from 'react-router-dom';
import { connect } from "react-redux";
import PrivateRoute from '../HOC/PrivateRoute';
import Header from '../common/header';
import Sidenav from '../common/sidenav/sidenav';
import Dashboard from '../dashboard/index';
import Users from '../users/index';
import Companies from '../companies/index';
import Products from '../products/index';
import Servicecalls from '../servicecalls/index';
import ServicecallDetailPage from '../servicecalls/servicecallDetailPage';


const Layout = (props) => {
	const { sidebarToggle } = props;
	return (
		<>
			<Header showSidebar={sidebarToggle} />
			<div
				className={
					sidebarToggle
						? "parent-container grid-container"
						: "parent-container removeSidebar"
					}
			>
					<Sidenav />
					<div className="mainContent">
					<Switch>
						<PrivateRoute exact path="/admin/dashboard">
							<Dashboard />
						</PrivateRoute>

						<PrivateRoute exact path="/admin/users">
							<Users />
						</PrivateRoute>	

						<PrivateRoute exact path="/admin/companies">
							<Companies />
						</PrivateRoute>		

						<PrivateRoute exact path="/admin/products">
							<Products />
						</PrivateRoute>		

						<PrivateRoute exact path="/admin/servicecalls">
							<Servicecalls />
						</PrivateRoute>	

						<PrivateRoute exact path="/admin/servicecalls/:id/detail/:companyId">
							<ServicecallDetailPage />
						</PrivateRoute>

					</Switch>
					</div>
			</div>
		</>
	);
};


const mapStateToProps = (state) => ({
	sidebarToggle: state.sidebarReducer.showSidebar,
});

export default connect(mapStateToProps, null)(Layout);