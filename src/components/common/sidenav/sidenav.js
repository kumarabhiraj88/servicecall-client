import React from 'react';
import { Nav } from 'react-bootstrap';
import SideNavHeader from './sidenavheader';
import RenderLink from './sidenavLinks';
const Sidenav = () => {
	return(
		<div className="sidenav">
			<SideNavHeader />
			<div className="sidebarNav">
                <Nav defaultActiveKey="/home" className="flex-column">
                    <RenderLink />
                </Nav>
			</div>
		</div>
		);
};

export default Sidenav;