import { Badge, Button, Col, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import useAppDispatch from '../hooks/useAppDispatch';
import { deleteNote } from '../store/reducers/notesSlice';
import { Note as NoteType } from '../types/types';

function Note() {
	const note = useOutletContext<NoteType>();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	return (
		<>
			<Row className="align-items-center mb-4">
				<Col>
					<h1>{note.title}</h1>
					{note.tags.length > 0 && (
						<Stack gap={1} direction="horizontal" className="flex-wrap">
							{note.tags.map(tag => (
								<Badge className="text-truncate" key={tag.id}>
									{tag.label}
								</Badge>
							))}
						</Stack>
					)}
				</Col>
				<Col xs="auto">
					<Stack gap={2} direction="horizontal">
						<Link to={`/${note.id}/edit`}>
							<Button variant="primary">Edit</Button>
						</Link>
						<Button
							onClick={() => {
								dispatch(deleteNote(note.id));
								navigate('/');
							}}
							variant="outline-danger">
							Delete
						</Button>
						<Link to="/">
							<Button variant="outline-secondary">Back</Button>
						</Link>
					</Stack>
				</Col>
			</Row>
			<ReactMarkdown>{note.markdown}</ReactMarkdown>
		</>
	);
}

export default Note;
