import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { removeTag, updateTag } from '../store/reducers/tagsSlice';

type TagsModalProps = {
	isModalOpen: boolean;
	handleClose: () => void;
};

function TagsModal({ handleClose, isModalOpen }: TagsModalProps) {
	const dispatch = useAppDispatch();
	const tags = useAppSelector(state => state.tags);

	return (
		<Modal show={isModalOpen} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edit Tags</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Stack gap={2}>
						{tags.map(tag => (
							<Row key={tag.id}>
								<Col>
									<Form.Control
										type="text"
										value={tag.label}
										onChange={e => {
											dispatch(
												updateTag({ id: tag.id, label: e.target.value })
											);
										}}
									/>
								</Col>
								<Col xs="auto">
									<Button
										onClick={() => {
											dispatch(removeTag(tag.id));
										}}
										variant="outline-danger">
										&times;
									</Button>
								</Col>
							</Row>
						))}
					</Stack>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default TagsModal;
