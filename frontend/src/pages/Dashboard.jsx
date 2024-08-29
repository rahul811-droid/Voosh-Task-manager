import React, { useState, useEffect } from 'react';
import TaskManager from '../components/TaskManager';
import TaskModal from '../components/TaskModal'; // Import the modal component

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });
    const [error, setError] = useState(null);
    const [userTasks, setUserTasks] = useState([]); // Move userTasks here
    const [tasksUpdated, setTasksUpdated] = useState(false); // State to trigger refetch

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

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

        fetchPosts();
    }, [tasksUpdated]); // Refetch tasks when tasksUpdated changes

    const handleAddTask = async () => {
        try {
            const res = await fetch('/api/task/addtask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                setFormData({ title: "", description: "" }); // Clear form data
                setError(null); // Clear error
                handleCloseModal(); // Close modal
                setTasksUpdated(prev => !prev); // Trigger refetch
                return "Task added successfully";
            } else {
                setError(data.message || "An error occurred");
            }
        } catch (error) {
            setError(error.message || "An error occurred");
        }
    };

    return (
        <div className="max-h-full max-w-[99%] mx-auto md:max-w-[97%] sm:max-w-[95%]">
            <button
                onClick={handleOpenModal}
                className='w-full sm:w-40 text-white font-semibold rounded-md ml-0 sm:ml-10 bg-blue-500 h-10 mt-10'
            >
                Add Task
            </button>
            <div className='max-w-full flex flex-col sm:flex-row justify-between h-auto sm:h-12 mt-10 shadow-lg border-2 rounded-lg items-center p-2 sm:p-0'>
                <p className='flex flex-row gap-2 ml-1 items-center w-full sm:w-auto'>
                    Search:
                    <span className='w-full sm:w-auto'>
                        <input
                            type="text"
                            placeholder='Search..'
                            className='h-8 w-full sm:w-[400px] border-2 p-2 shadow-sm rounded-md'
                        />
                    </span>
                </p>
                <p className='mt-4 sm:mt-0 sm:mr-2 flex flex-row gap-1 w-full sm:w-auto items-center'>
                    Sort By:
                    <span>
                        <select className='w-full sm:w-[100px] border-2 p-1 rounded-md'>
                            <option>Recent</option>
                            <option>Popular</option>
                            <option>One day ago</option>
                        </select>
                    </span>
                </p>
            </div>
            <div className=''>
                <TaskManager userTasks={userTasks} setUserTasks={setUserTasks} />
            </div>
            <TaskModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                formData={formData}
                setFormData={setFormData}
                onAddTask={handleAddTask}
                error={error}
            />
        </div>
    );
};

export default Dashboard;
