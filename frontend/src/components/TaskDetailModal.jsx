// TaskDetailModal.js
import React from 'react';

const TaskDetailModal = ({ isOpen, onClose, task }) => {
    if (!isOpen || !task) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex  items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Task Details</h2>
                <div className="mb-4">
                    <h3 className="text-lg font-medium">Title: {task.title}</h3>
                    <p className="text-sm text-gray-700">Description: {task.description}</p>
                    <p className="text-sm text-gray-700">Status: {task.status}</p>
                    <p className="text-sm text-gray-700">createdAt: {new Date(task.createdAt).toLocaleString()}</p>
                    {/* <p className='mt-5'>{new Date(task.createdAt).toLocaleString()}</p> */}

                </div>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default TaskDetailModal;
