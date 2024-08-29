import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({ task, index, onDelete, onEdit,onViewDetails }) => (
    <Draggable key={task._id} draggableId={task._id} index={index}>
        {(provided) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className='p-2 m-2 rounded shadow bg-blue-200'
            >
                <h2 className='text-lg font-bold'>{task.title}</h2>
                <p className='text-gray-700 mt-1 text-xl'>{task.description}</p>
                <p className='mt-5'>{new Date(task.createdAt).toLocaleString()}</p>
                <p className='mt-5 flex gap-2 items-center'>
                    status:<span className='text-xl font-semibold'>{task.status}</span>
                </p>
                <div className='flex flex-row gap-2 justify-end'>
                    <button
                        onClick={() => onDelete(task._id)}
                        className='text-white text-xl h-8 w-20 rounded-lg bg-red-500'
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => onEdit(task)}
                        className='text-white text-xl h-8 w-20 rounded-lg bg-green-500'
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onViewDetails(task)}
                        className='text-white text-xl h-8 w-40 rounded-lg bg-blue-500'
                    >
                        View Details
                    </button>
                </div>
            </div>
        )}
    </Draggable>
);

export default TaskCard;
