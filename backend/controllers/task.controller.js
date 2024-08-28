import Task from "../models/task.model.js";
import { errorHandler } from "../utils/error.js";

export const createTask = async (req, res, next) => {
  const { title, description } = req.body;


  if (!req.user) {
    return next(errorHandler(403, 'You are not allowed to create a post'));
  }
  try {


    // Validate required fields
    if (!title || !description) {
      return next(errorHandler(400, 'Please provide all required fields'));
    }

    // Create a new task
    const newTask = new Task({
      title,
      description,
      createdBy: req.user.id
    });

    // Save the task to the database
    const saved = await newTask.save();

    // Respond with success message
    res.status(201).json({ message: "new task added successfully", saved });
  } catch (error) {
    console.log("Error in createTask function:", error);
    next(error);
  }
};




export const updateTask = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this Task'));
  }

  try {
    // console.log( req.params.taskId)
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        $set: {
          title: req.body.title,
          description: req.body.description
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "updated task", updatedTask });
  } catch (error) {
    console.log("error in updatedTask", error)

    next(error);
  }
};


export const getallTask = async (req, res, next) => {


  if (!req.user) {
    return next(errorHandler(403, 'You are not allowed to get all the task'));
  }

  try {
    const allTask = await Task.find();
    res.status(200).json(allTask);
  } catch (error) {
    next(error)

  }
}



export const deleteTask = async (req, res, next) => {
  if (!req.user || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this Task'));
  }
  try {
    await Task.findOneAndDelete(req.params.taskId);
    res.status(200).json('Thos Task has been deleted');
  } catch (error) {
    console.log("error in delete task function", error)

    next(error)
  }
}



export const getOneTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return next(errorHandler(404, 'Task not found'));
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};