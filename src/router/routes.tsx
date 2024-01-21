import { Navigate } from 'react-router-dom';

import NoteLayout from '../layouts/NoteLayout';

import NewNotePage from '../pages/NewNotePage';
import NotesPage from '../pages/NotesPage';

import Note from '../components/Note';
import NoteEdit from '../components/NoteEdit';

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
		path: '/:id',
		element: <NoteLayout />,
		children: [
			{
				index: true,
				element: <Note />
			},
			{
				path: 'edit',
				element: <NoteEdit />
			}
		]
	},
	{
		path: '*',
		element: <Navigate to="/" replace />
	}
];

export default routes;
