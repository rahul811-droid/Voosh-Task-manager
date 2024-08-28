import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'done'],
      default: 'todo',
    },
    // dueDate: {
    //   type: Date,
    // },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // columnId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Column',
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
