import { Navigate, Outlet, useParams } from 'react-router-dom';
import useAppSelector from '../hooks/useAppSelector';

function NoteLayout() {
	const { id } = useParams();

	const notes = useAppSelector(state => state.notes);
	const note = notes.find(note => note.id === id);

	if (!note) return <Navigate to="/" replace />;

	return <Outlet context={note} />;
}

export default NoteLayout;
