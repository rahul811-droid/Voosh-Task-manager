import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const TaskColumn = ({ status, tasks, onViewDetails, onEdit,onDelete }) => (
    <Droppable key={status} droppableId={status}>
        {(provided) => (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='w-full sm:w-[30%] shadow-sm max-h-screen border-2 m-2'
            >
                <h2 className='w-full text-xl pl-2 text-white bg-blue-500'>{status}</h2>
                <div className='flex flex-col gap-3 p-2'>
                    {tasks.map((task, index) => (
                        <TaskCard 
                            key={task._id} 
                            task={task} 
                            index={index} 
                            onViewDetails={onViewDetails}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            </div>
        )}
    </Droppable>
);

export default TaskColumn;
