import { FormEvent, useRef, useState } from 'react';
import CreatableReactSelect from 'react-select/creatable';

import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAppDispatch from '../hooks/useAppDispatch';
import { createTag } from '../store/reducers/tagsSlice';
import useAppSelector from '../hooks/useAppSelector';
import { createNote, updateNote } from '../store/reducers/notesSlice';
import { PartialNote, Tag } from '../types/types';
import { nanoid } from '@reduxjs/toolkit';

interface NoteFormProps {
	note?: PartialNote;
}

function NoteForm({ note }: NoteFormProps) {
	const titleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const [selectedTags, setSelectedTags] = useState<Tag[]>(note?.tags || []);

	const dispatch = useAppDispatch();
	const createdTags = useAppSelector(state => state.tags);

	const navigate = useNavigate();

	const title = note?.title || '';
	const markdown = note?.markdown || '';

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const noteData = {
			title: titleRef.current!.value,
			markdown: markdownRef.current!.value,
			tags: selectedTags
		};

		if (note) {
			dispatch(updateNote({ id: note.id, ...noteData }));
		} else {
			dispatch(createNote(noteData));
		}

		navigate('..');
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={4}>
				<Row>
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control ref={titleRef} required defaultValue={title} />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<CreatableReactSelect
								value={selectedTags.map(tag => {
									return { label: tag.label, value: tag.id };
								})}
								onCreateOption={label => {
									const tag = { id: nanoid(), label };
									setSelectedTags(prev => [...prev, tag]);
									dispatch(createTag(tag));
								}}
								options={createdTags.map(tag => {
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
				<Form.Group controlId="markdown">
					<Form.Label>Body</Form.Label>
					<Form.Control
						defaultValue={markdown}
						required
						as="textarea"
						ref={markdownRef}
						rows={15}
					/>
				</Form.Group>
				<Stack direction="horizontal" gap={2} className="justify-content-end">
					<Button type="submit" variant="primary">
						Save
					</Button>
					<Link to="..">
						<Button type="button" variant="outline-secondary">
							Cancel
						</Button>
					</Link>
				</Stack>
			</Stack>
		</Form>
	);
}

export default NoteForm;
