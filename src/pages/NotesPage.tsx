import { useMemo, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import { Tag } from '../types/types';
import NoteList from '../components/NoteList';
import TagsModal from '../components/TagsModal';
import useAppSelector from '../hooks/useAppSelector';

function NotesPage() {
	const [search, setSearch] = useState('');
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const notes = useAppSelector(state => state.notes);

	const filteredNotes = useMemo(() => {
		return notes.filter(note => {
			return (
				(search === '' || note.title.toLowerCase().includes(search.toLowerCase())) &&
				(selectedTags.length === 0 ||
					selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
			);
		});
	}, [search, selectedTags, notes]);

	return (
		<>
			<Header setIsModalOpen={setIsModalOpen} />
			<Controls
				search={search}
				setSearch={setSearch}
				selectedTags={selectedTags}
				setSelectedTags={setSelectedTags}
			/>
			<NoteList notes={filteredNotes} />
			<TagsModal isModalOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />
		</>
	);
}

export default NotesPage;

interface IHeaderProps {
	setIsModalOpen: (isOpen: boolean) => void;
}

function Header({ setIsModalOpen }: IHeaderProps) {
	return (
		<Row className="align-items-center mb-4">
			<Col>
				<h1>Notes</h1>
			</Col>
			<Col xs="auto">
				<Stack gap={2} direction="horizontal">
					<Link to="/new">
						<Button variant="primary">Create</Button>
					</Link>
					<Button onClick={() => setIsModalOpen(true)} variant="outline-secondary">
						Edit Tags
					</Button>
				</Stack>
			</Col>
		</Row>
	);
}

interface IControlsProps {
	search: string;
	setSearch: (search: string) => void;
	selectedTags: Tag[];
	setSelectedTags: (tags: Tag[]) => void;
}

function Controls({ search, setSearch, selectedTags, setSelectedTags }: IControlsProps) {
	const tags = useAppSelector(state => state.tags);

	return (
		<Form>
			<Row className="mb-4">
				<Col>
					<Form.Group controlId="title">
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId="tags">
						<Form.Label>Tags</Form.Label>
						<ReactSelect
							value={selectedTags.map(tag => {
								return { label: tag.label, value: tag.id };
							})}
							options={tags.map(tag => {
								return { label: tag.label, value: tag.id };
							})}
							onChange={tags => {
								setSelectedTags(
									tags.map(tag => {
										return { label: tag.label, id: tag.value };
									})
								);
							}}
							isMulti
						/>
					</Form.Group>
				</Col>
			</Row>
		</Form>
	);
}
