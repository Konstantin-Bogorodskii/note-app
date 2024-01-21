import { Button, Col, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface HeaderProps {
	setIsModalOpen: (isOpen: boolean) => void;
}

function Header({ setIsModalOpen }: HeaderProps) {
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

export default Header;
