import React from "react";
import { NavLink } from "react-router-dom";
import { sideNav } from '../../../constants/sidenavLinks';

const RenderLink = () => {

	const loggedPrivilegeId = localStorage.getItem('privilegeId');

	return sideNav.map((data, index) => (
       
		<NavLink
			className={(loggedPrivilegeId==2 || loggedPrivilegeId==3) && (data.routeLabel==='Users' || data.routeLabel==='Companies' || data.routeLabel==='Products') ? 'hide-LinkStyle' : 'LinkStyle' }
			activeClassName='is-active'
			to={data.link}
			key={index}
		>

		{ data.icon }{ data.routeLabel }
		</NavLink>
		));
};

export default RenderLink;