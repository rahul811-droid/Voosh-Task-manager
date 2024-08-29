import express from 'express'
import {createTask ,updateTask,getallTask,deleteTask ,getOneTask} from '../controllers/task.controller.js';
import {verifyToken} from '../utils/verifyUser.js'
const router = express.Router();

router.post('/addtask',verifyToken,createTask);
router.put('/update/:taskId/:userId',verifyToken,updateTask);
router.get('/getalltask',verifyToken,getallTask);
router.delete('/delete/:taskId/:userId',verifyToken,deleteTask);
router.get('/getonetask/:taskId/',verifyToken,getOneTask);


export default router ;