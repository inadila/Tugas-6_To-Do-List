import React from 'react';
import { Card, Table, Badge, Button, Tooltip, OverlayTrigger, ProgressBar } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';


const TaskList = ({ tasks, deleteTask, showEditForm, toggleTaskStatus }) => {
    const getPriorityStyle = (priority) => {
        switch(priority) {
            case 'High': return { background: '#e74c3c', color: 'white' };
            case 'Medium': return { background: '#0d6efd', color: 'white' };
            case 'Low': return { background: '#2ecc71', color: 'white' };
            default: return {};
        }
    };

    return (
      
        <Card.Body>
            <Table striped bordered hover className="mb-0">
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Progress</th>
                    <th>Actions</th>
                </tr>
            </thead>

                <tbody>
                    {tasks.length > 0 ? (
                        tasks.map((task) => {
                            const progressValue = task.progress || 0;

                            return (
                                <tr key={task.id} className="fw-normal">
                                    <td>
                                        <ProgressBar
                                            now={progressValue}
                                            label={`${progressValue}%`}
                                            animated
                                            variant={progressValue === 100 ? "success" : "primary"} // warna biru Bootstrap
                                        />
                                    </td>
                                    <td>{task.name}</td>
                                    <td>
                                        <Badge pill style={getPriorityStyle(task.priority)} className="mx-2">
                                            {task.priority}
                                        </Badge>
                                    </td>
                                    <td>{task.status}</td>
                                    <td>
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Remove Task</Tooltip>}>
                                            <Button 
                                                variant="danger" 
                                                size="sm" 
                                                className="me-3" 
                                                onClick={() => deleteTask(task.id)}
                                            >
                                                <Trash />
                                            </Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Edit Task</Tooltip>}>
                                            <Button 
                                                variant="primary" // Mengubah warna tombol Edit menjadi biru
                                                size="sm" 
                                                onClick={() => showEditForm(task)}
                                            >
                                                <PencilSquare />
                                            </Button>
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                             Let's make a task!
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Card.Body>
    );
};

export default TaskList;