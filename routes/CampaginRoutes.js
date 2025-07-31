// routes/campaignRoutes.js
import express from "express";
import {
  postCreateCampaign,
  getCreateCampaign,
  getCampaign,
} from "../controllers/campaignController.js";

const router = express.Router();

router.get("/", getCreateCampaign);
router.post("/createCampaign", postCreateCampaign);
router.get("/campaign", getCampaign);


export default router;
