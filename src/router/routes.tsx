import { Navigate } from 'react-router-dom';

// import RootLayout from '../layouts/RootLayout';

import NewNotePage from '../pages/NewNotePage';
import NotesPage from '../pages/NotesPage';

const routes = [
	{
		path: '/',
		element: <NotesPage />
	},
	{
		path: '/new',
		element: <NewNotePage />
	},
	{
		path: '/id',
		children: [
			{
				index: true,
				element: <h1>id</h1>
			},
			{
				path: 'edit',
				element: <h1>edit</h1>
			}
		]
	},
	{
		path: '*',
		element: <Navigate to="/" replace />
	}
];

export default routes;
