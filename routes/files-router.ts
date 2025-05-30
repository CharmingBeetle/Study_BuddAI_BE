import express from 'express';
import upload from '../services/upload';
import uploadFiles from '../controllers/files_controller';
const filesRouter = express.Router();
import multerErrorHandler from '../middleware/multerErrorHandler';

// POST /api/files/upload - create a new file
filesRouter.post('/upload', 
  upload.single('file'),
  multerErrorHandler, 
  uploadFiles
  )
 
  export default filesRouter;