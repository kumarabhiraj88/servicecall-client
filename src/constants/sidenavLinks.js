import { Dashboard, People, Business, ShoppingBasket, Call } from '@material-ui/icons';

export const sideNav = [
	{ icon: <Dashboard className="sidenavIcon" />, routeLabel: "Dashboard", link:"/admin/dashboard" },
	{ icon: <People className="sidenavIcon" />, routeLabel: "Users", link:"/admin/users" },
	{ icon: <Business className="sidenavIcon" />, routeLabel: "Companies", link:"/admin/companies" },
	{ icon: <ShoppingBasket className="sidenavIcon" />, routeLabel: "Products", link:"/admin/products" },
	{ icon: <Call className="sidenavIcon" />, routeLabel: "Servicecalls", link:"/admin/servicecalls" },
]