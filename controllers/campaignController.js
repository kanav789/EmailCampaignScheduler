import CampaignModel from "../models/CampaignModel.js";

export const getCreateCampaign = (req, res) => {
  res.render("createCampaign");
};

export const postCreateCampaign = async (req, res) => {
  try {
    const { title, message, recipients, scheduledTime } = req.body;

    if (!title || !message || !recipients || !scheduledTime) {
      return res.status(400).send("All fields are required");
    }

    const recipientsList = recipients
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email);

    const newCampaign = new CampaignModel({
      title,
      message,
      recipients: recipientsList,
      scheduledTime: new Date(scheduledTime),
      status: "pending",
    });

    await newCampaign.save();

    if (!newCampaign) {
      return res.status(500).send("Failed to create campaign");
    }
    res.redirect("/");
    return;
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).send("Internal server error");
  }
};
