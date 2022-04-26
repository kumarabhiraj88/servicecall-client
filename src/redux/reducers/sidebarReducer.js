import { TOGGLE_SIDEBAR } from '../types/sidebarTypes';
const initialState = {
	showSidebar: true
};

const sidebarReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_SIDEBAR:
			return {
				...state,
				showSidebar: !state.showSidebar
			};
		default:
			return state;
	}
};

export default sidebarReducer;
