import { Col, Row } from 'react-bootstrap';
import NoteCard from './NoteCard';
import { Note } from '../types/types';

interface NoteListInterface {
	notes: Note[];
}

function NoteList({ notes }: NoteListInterface) {
	return (
		<Row xs={1} sm={2} lg={3} xl={4} className="g-3">
			{notes.map(note => (
				<Col key={note.id}>
					<NoteCard id={note.id} title={note.title} tags={note.tags} />
				</Col>
			))}
		</Row>
	);
}

export default NoteList;
