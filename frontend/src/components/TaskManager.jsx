import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import TaskColumn from './TaskColumn';
import TaskDetailModal from './TaskDetailModal'; // Import the detail modal
import EditTaskModal from './EditTaskModal'; // Import the edit task modal

const TaskManager = () => {
    const { currentUser } = useSelector((state) => state.user);

    const [userTasks, setUserTasks] = useState([]);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [taskToView, setTaskToView] = useState(null); // Add state for view details
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/task/getalltask');
                const data = await res.json();
                if (res.ok) {
                    setUserTasks(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        if (currentUser) {
            fetchPosts();
        }
    }, [currentUser]);

    const onDragEnd = async (result) => {
        const { source, destination } = result;

        if (!destination) return;

        const updatedTasks = [...userTasks];
        const [movedTask] = updatedTasks.splice(source.index, 1);
        movedTask.status = destination.droppableId;
        updatedTasks.splice(destination.index, 0, movedTask);

        setUserTasks(updatedTasks);

        try {
            await fetch(`/api/task/update/${movedTask._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: movedTask.status })
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await fetch(`/api/task/delete/${taskId}/${currentUser._id}`, {
                method: 'DELETE'
            });
            setUserTasks(userTasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleEdit = async (task) => {
        setTaskToEdit(task);
        setIsEditModalOpen(true);
    };

    const handleViewDetails = (task) => {
        setTaskToView(task); // Set task to view
        setIsDetailModalOpen(true);
    };

    const handleUpdateTask = async (updatedTask) => {
        try {
            const res = await fetch(`/api/task/update/${updatedTask._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask)
            });
            if (res.ok) {
                const updatedTasks = userTasks.map(task =>
                    task._id === updatedTask._id ? updatedTask : task
                );
                setUserTasks(updatedTasks);
                setIsEditModalOpen(false);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const tasksByStatus = {
        TODO: [],
        'IN PROGRESS': [],
        DONE: [],
    };

    userTasks.forEach(task => {
        const status = task.status.toUpperCase();
        if (tasksByStatus[status]) {
            tasksByStatus[status].push(task);
        }
    });

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className='max-w-full flex flex-col sm:flex-row gap-3 max-h-full shadow-lg p-4'>
                    {['TODO', 'IN PROGRESS', 'DONE'].map((status) => (
                        <TaskColumn
                            key={status}
                            status={status}
                            tasks={tasksByStatus[status]}
                            onDelete={handleDelete} 
                            onEdit={handleEdit}
                            onViewDetails={handleViewDetails} // Pass the function here
                        />
                    ))}
                </div>
            </DragDropContext>
            <TaskDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                task={taskToView} // Use taskToView for details
            />
            <EditTaskModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                task={taskToEdit}
                onUpdateTask={handleUpdateTask}
            />
        </div>
    );
};

export default TaskManager;
