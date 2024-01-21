import { Col } from 'react-bootstrap';
import NoteCard from './NoteCard';
import { Note } from '../types/types';

interface NoteListInterface {
	notes: Note[];
}

function NoteList({ notes }: NoteListInterface) {
	return (
		<>
			{notes.map(note => (
				<Col key={note.id}>
					<NoteCard id={note.id} title={note.title} tags={note.tags} />
				</Col>
			))}
		</>
	);
}

export default NoteList;
