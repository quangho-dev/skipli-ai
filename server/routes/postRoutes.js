import express from "express";

import {
  createCaptionsFromIdeas,
  generatePostCaptions,
  getPostIdeas,
  getUserGeneratedContents,
  saveGeneratedContent,
  unsaveContent,
} from "../controllers/postControllers.js";

const router = express.Router();

router.post("/generatePostCaptions", generatePostCaptions);
router.post("/getPostIdeas", getPostIdeas);
router.post("/createCaptionsFromIdeas", createCaptionsFromIdeas);
router.post("/saveGeneratedContent", saveGeneratedContent);
router.get("/getUserGeneratedContents/:phoneNumber", getUserGeneratedContents);
router.post("/unsaveContent/:captionId", unsaveContent);

export default router;
