import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

const TaskManager = () => {
    const [tasks, setTasks] = useState({});

    useEffect(() => {
        // Fetch tasks from the server
        axios.get('/api/task/getall')
            .then(res => setTasks(groupTasksByStatus(res.data)))
            .catch(err => console.error(err));
    }, []);

    console.log(tasks)
    const groupTasksByStatus = (tasks) => {
        return {
            'To Do': tasks.filter(task => task.status === 'To Do'),
            'In Progress': tasks.filter(task => task.status === 'In Progress'),
            'Done': tasks.filter(task => task.status === 'Done')
        };
    };

    const handleDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceColumn = tasks[source.droppableId];
        const destinationColumn = tasks[destination.droppableId];

        const [movedTask] = sourceColumn.splice(source.index, 1);
        destinationColumn.splice(destination.index, 0, movedTask);

        setTasks({
            ...tasks,
            [source.droppableId]: sourceColumn,
            [destination.droppableId]: destinationColumn
        });

        // Update task status in the backend
        // axios.put(`/api/tasks/${movedTask._id}`, { status: destination.droppableId })
        //     .catch(err => console.error(err));
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div style={boardStyle}>
                {['To Do', 'In Progress', 'Done'].map((status, index) => (
                    <Droppable droppableId={status} key={index}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={columnStyle}
                            >
                                <h2>{status}</h2>
                                {tasks[status]?.map((task, index) => (
                                    <Draggable key={task._id} draggableId={task._id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{ ...taskStyle, ...provided.draggableProps.style }}
                                            >
                                                <h4>{task.title}</h4>
                                                <p>{task.description}</p>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

const boardStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px'
};

const columnStyle = {
    width: '30%',
    minHeight: '400px',
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderRadius: '5px'
};

const taskStyle = {
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
};

export default TaskManager;
