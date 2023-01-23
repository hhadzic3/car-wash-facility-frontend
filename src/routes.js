import { NotFoundPage, UserPage, AdminPage, LoginPage, RegisterPage, UnauthorizedPage } from './pages/index';
import { UserRoles } from './common/enums/enums' 

const routes = [
	{
		path: '/login',
		element: <LoginPage />,
		authorized: false,
		allowedRoles: [],
	},
	{
		path: '/register',
		element: <RegisterPage />,
		authorized: false,
		allowedRoles: [],
	},
	{
		path: '/user',
		element: <UserPage />,
		authorized: true,
		allowedRoles: [UserRoles.User],
	},
	{
		path: '/admin',
		element: <AdminPage />,
		authorized: true,
		allowedRoles: [UserRoles.Admin],
	},
	{
		path: '/unauthorized',
		element: <UnauthorizedPage />,
		authorized: false,
		allowedRoles: [],
	},
	{
		path: '*',
		element: <NotFoundPage />,
		authorized: false,
		allowedRoles: [],
	},
];

export default routes;
