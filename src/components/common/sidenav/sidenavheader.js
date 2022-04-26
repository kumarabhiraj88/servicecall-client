import React from 'react';
import Logo from '../../../assets/images/logo.png';
const SideNavHeader = () => {
	return(
			<div className='sideNavHeader'>
				<img alt='Logo' className='logo' src={Logo} />
			</div>
		);
};

export default SideNavHeader;