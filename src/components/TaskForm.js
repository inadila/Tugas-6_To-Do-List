import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const TaskForm = ({ show, handleClose, addTask, editTask, taskToEdit }) => {
    const [task, setTask] = useState({ name: '', priority: 'Medium', status: 'To Do', progress: '0' });

    useEffect(() => {
        if (taskToEdit) {
            setTask(taskToEdit);
        } else {
            setTask({ name: '', priority: 'Medium', status: 'To Do', progress: '0' });
        }
    }, [taskToEdit]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (task.name.trim()) {
            taskToEdit ? editTask(task) : addTask(task);
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{taskToEdit ? 'Edit Task' : 'Add Task'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="taskName" className="mb-3">
                        <Form.Label>Task</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={task.name}
                            onChange={handleChange}
                            placeholder="Enter task name"
                        />
                    </Form.Group>
                    <Form.Group controlId="taskPriority" className="mb-3">
                        <Form.Label>Priority</Form.Label>
                        <Form.Select name="priority" value={task.priority} onChange={handleChange}>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="taskStatus" className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select name="status" value={task.status} onChange={handleChange}>
                            <option>To Do</option>
                            <option>In Progress</option>
                            <option>Done</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="taskProgress" className="mb-3">
                        <Form.Label>Progress</Form.Label>
                        <Form.Select name="progress" value={task.progress} onChange={handleChange}>
                            <option value="0">0%</option>
                            <option value="25">25%</option>
                            <option value="50">50%</option>
                            <option value="75">75%</option>
                            <option value="100">100%</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {taskToEdit ? 'Update Task' : 'Add Task'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TaskForm;