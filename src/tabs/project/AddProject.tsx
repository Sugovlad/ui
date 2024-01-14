import React, { useState } from 'react';
import { Modal, Button, Form, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Project from "./Project";

interface AddProjectFormProps {
    show: boolean;
    handleClose: () => void;
    addProject: (project: Project) => void;
}

const AddProjectForm: React.FC<AddProjectFormProps> = ({ show, handleClose, addProject }) => {
    const [projectName, setProjectName] = useState('');
    const [status, setStatus] = useState<string>('inactive');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const isActive = status === 'active';
        addProject({ id: null, projectName, status: Number(isActive), assignedUsers: [] });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3"> {/* Added margin-bottom */}
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={projectName}
                            onChange={e => setProjectName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex justify-content-between align-items-center"> {}
                        <Form.Label>Status</Form.Label>
                        <ToggleButtonGroup
                            type="radio"
                            name="status"
                            value={status}
                            onChange={(value: string) => setStatus(value)}
                        >
                            <ToggleButton
                                id="tbg-radio-1"
                                value="active"
                                type="radio"
                                variant="outline-success"
                            >
                                Active
                            </ToggleButton>
                            <ToggleButton
                                id="tbg-radio-2"
                                value="inactive"
                                type="radio"
                                variant="outline-danger"
                            >
                                Inactive
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Project
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddProjectForm;
