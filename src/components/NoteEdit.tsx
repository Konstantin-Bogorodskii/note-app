import { useOutletContext } from 'react-router-dom';
import NoteForm from './NoteForm';
import { Note } from '../types/types';

function NoteEdit() {
	const note = useOutletContext<Note>();

	return (
		<>
			<h1 className="mb-4">Edit Note</h1>
			<NoteForm note={note} />
		</>
	);
}

export default NoteEdit;
