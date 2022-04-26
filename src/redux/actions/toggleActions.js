import { TOGGLE_SIDEBAR } from '../types/toggleTypes';

export const toggleSidebar = () => dispatch =>
	dispatch({
		type: TOGGLE_SIDEBAR
	});
