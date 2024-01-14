import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import User from './User';


interface MyFormProps {
    show: boolean;
    handleClose: () => void;
    addUserCallback: (user: User) => void;
}

function AddUserForm({show, handleClose, addUserCallback}: MyFormProps) {
    const [fullName, setFullName] = useState('');
    const [loginName, setLoginName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newUser: User = {
            id: null,
            fullName,
            loginName,
            password: password,
        };
        addUserCallback(newUser);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className={"mb-3"}>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className={"mb-3"}>
                        <Form.Label>Login Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={loginName}
                            onChange={e => setLoginName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className={"mb-3"}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className={"mb-1 d-flex justify-content-center"}>
                        <Button variant="primary" type="submit">
                            Add User
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddUserForm;