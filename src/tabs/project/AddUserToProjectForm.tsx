import React, {useState, useEffect} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import User from "../user/User";
import {fetchUserList} from "../../services/crudService";

interface AddUserToProjectFormProps {
    show: boolean;
    handleClose: () => void;
    addUserToProject: (projectId: number, userId: number) => void;
    projectId: number;
}

const AddUserToProjectForm: React.FC<AddUserToProjectFormProps> = ({
                                                                       show,
                                                                       handleClose,
                                                                       addUserToProject,
                                                                       projectId
                                                                   }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    useEffect(() => {
        fetchUserList(setUsers)
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (projectId != null && selectedUserId != null) {
            addUserToProject(projectId, selectedUserId);
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add User to Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>User</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={e => setSelectedUserId(Number(e.target.value))}
                        >
                            <option value="">Select User</option>
                            {users.map(user => (
                                <option key={user.id} value={user?.id ?? -1}>{user.fullName}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit"
                            disabled={ selectedUserId == null}>
                        Add User to Project
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddUserToProjectForm;
