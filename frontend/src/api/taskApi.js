export const fetchAllTasks = async () => {
    const res = await fetch(`/api/task/getalltask`);
    if (!res.ok) {
        throw new Error('Failed to fetch tasks');
    }
    return await res.json();
};

export const updateTaskStatus = async (taskId, status) => {
    const res = await fetch(`/api/task/updatetask/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    });
    if (!res.ok) {
        throw new Error('Failed to update task status');
    }
};
