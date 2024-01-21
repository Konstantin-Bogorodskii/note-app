import { useMemo, useState } from 'react';
import useAppSelector from '../hooks/useAppSelector';

import Header from '../components/Header';
import Controls from '../components/Controls';
import NoteList from '../components/NoteList';
import TagsModal from '../components/TagsModal';

import { Tag } from '../types/types';
import { Row } from 'react-bootstrap';

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
			<Row xs={1} sm={2} lg={3} xl={4} className="g-3">
				<NoteList notes={filteredNotes} />
			</Row>
			<TagsModal isModalOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />
		</>
	);
}

export default NotesPage;
