//import { UserRoles } from 'common/constants/enums';
import { AuthPage, HomePage, NotFoundPage, UserPage, AdminPage, LoginPage, RegisterPage } from './pages/index';

const routes = [
	{
		path: '/',
		name: 'home.title',
		element: <HomePage />,
		allowedRoles: [],
		authorized: false,
	},
	{
		path: '/user',
		element: <UserPage />,
		//authorized: true,
		//allowedRoles: [UserRoles.User],
	},
	{
		path: '/admin',
		element: <AdminPage />,
		//authorized: true,
		//allowedRoles: [UserRoles.Admin],
	},
	{
		path: '/login',
		name: 'login.login',
		element: <LoginPage />,
		allowedRoles: [],
		authorized: false,
	},
	{
		path: '/register',
		name: 'register.register',
		element: <RegisterPage />,
		allowedRoles: [],
		authorized: false,
	},
	{
		path: '*',
		name: '',
		element: <NotFoundPage />,
		allowedRoles: [],
		authorized: false,
	},
];

export default routes;
