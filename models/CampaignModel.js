import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  title: String,
  message: String,
  recipients: [String],
  scheduledTime: Date,
  status: {
    type: String,
    enum: ["pending", "sent", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CampaignModel = mongoose.model("Campaign", campaignSchema);

export default CampaignModel;
