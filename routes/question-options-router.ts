import { Router } from "express";
import { postOptions,getOptionsByQuestionId } from "../controllers/options_controller";


const questionOptionsRouter = Router();

// GET /api/questions_options - get question option by question id
questionOptionsRouter.get("/:question_id", getOptionsByQuestionId)

// POST /api/question_options - create question options
questionOptionsRouter.post("/", postOptions)

export default questionOptionsRouter;