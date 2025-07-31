// routes/campaignRoutes.js
import express from "express";
import {
  postCreateCampaign,
  getCreateCampaign,
} from "../controllers/campaignController.js";

const router = express.Router();

router.get("/", getCreateCampaign);
router.post("/createCampaign", postCreateCampaign);

export default router;
