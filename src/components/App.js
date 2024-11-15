import React, { useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const handleShowForm = () => setShowForm(true);
    const handleCloseForm = () => {
        setShowForm(false);
        setTaskToEdit(null);
    };

    const addTask = (task) => {
        setTasks([...tasks, { ...task, id: Date.now() }]);
    };

    const editTask = (updatedTask) => {
        setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const showEditForm = (task) => {
        setTaskToEdit(task);
        handleShowForm();
    };

    const toggleTaskStatus = (id) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                let newStatus;
                if (task.status === 'To Do') newStatus = 'In Progress';
                else if (task.status === 'In Progress') newStatus = 'Done';
                else newStatus = 'To Do';
                
                return { ...task, status: newStatus };
            }
            return task;
        }));
    };

    return (
        <Container style={{ 
            maxWidth: '800px', 
            marginTop: '50px', 
            backgroundImage: 'linear-gradient(135deg, #6FC3F7, #d966d5', 
            padding: '20px', 
            borderRadius: '15px',
            color: '#f5f6fa'
        }}>
            <Row className="mb-4">
                <Col>
                    <h1 style={{ fontWeight: 'bold', color: '#f5f6fa' }}>Task List</h1>
                </Col>
                <div className="col-md-6 text-end">
                  <Button 
                      style={{ 
                          backgroundColor: '#a53eb3', 
                          border: 'none', 
                          color: 'white'
                      }} 
                      onClick={handleShowForm}
                  >
                      + Add Task
                  </Button>
              </div>

            </Row>
            <TaskList tasks={tasks} deleteTask={deleteTask} showEditForm={showEditForm} toggleTaskStatus={toggleTaskStatus} />
            <TaskForm show={showForm} handleClose={handleCloseForm} addTask={addTask} editTask={editTask} taskToEdit={taskToEdit} />
        </Container>
    );
}


export default App;
