import { Col, Form, Row } from 'react-bootstrap';
import { Tag } from '../types/types';
import ReactSelect from 'react-select';
import useAppSelector from '../hooks/useAppSelector';

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
							placeholder="Search..."
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

export default Controls;
