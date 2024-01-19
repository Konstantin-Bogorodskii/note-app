import { FormEvent, useRef } from 'react';
import CreatableReactSelect from 'react-select/creatable';

import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAppDispatch from '../hooks/useAppDispatch';
import { createTag } from '../store/reducers/tagsSlice';
import useAppSelector from '../hooks/useAppSelector';
import { createNote } from '../store/reducers/notesSlice';
import { SelectInstance } from 'react-select';
import { Tag } from '../types/types';

function NoteForm() {
	const dispatch = useAppDispatch();

	const tags = useAppSelector(state => state.tags);

	const titleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const selectRef = useRef<SelectInstance>(null);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		// const tags = selectRef.current
		// 	?.getValue()
		// 	.map(tag => ({ id: tag.value, label: tag.label } as unknown) as Tag[]);
		// const note = {
		// 	title: titleRef.current!.value,
		// 	markdown: markdownRef.current!.value,
		// 	tags
		// };
		// dispatch(createNote(note));
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={4}>
				<Row>
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								ref={titleRef}
								required
								//   defaultValue={title}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<CreatableReactSelect
								// value={selectedTags.map(selectedTag => {
								// 	return { label: selectedTag.label, value: selectedTag.id };
								// })}
								onCreateOption={label => {
									dispatch(createTag(label));
								}}
								options={tags.map(tag => {
									return { label: tag.label, value: tag.id };
								})}
								ref={selectRef}
								isMulti
							/>
						</Form.Group>
					</Col>
				</Row>
				<Form.Group controlId="markdown">
					<Form.Label>Body</Form.Label>
					<Form.Control
						// defaultValue={markdown}
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
