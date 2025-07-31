import cron from "node-cron";
import CampaignModel from "../../models/CampaignModel.js";
import { sendEmail } from "../Nodemailer.js";

cron.schedule("* * * * *", async () => {
  try {
    const date = new Date(); // ✅ Full Date object

    console.log("⏰ Checking for campaigns to send at", date.toLocaleString());

    const campaigns = await CampaignModel.find({
      status: "pending",
      scheduledTime: { $lte: date },
    });

    if (!campaigns || campaigns.length === 0) {
      console.log("✅ No campaigns to send at this time.");
      return;
    }

    for (const campaign of campaigns) {
      let allSent = true;

      for (const recipient of campaign.recipients) {
        const sent = await sendEmail({
          to: recipient,
          subject: campaign.title,
          html: campaign.message,
        });

        if (!sent) allSent = false;
      }

      campaign.status = allSent ? "sent" : "failed";

      await campaign.save();
    }
  } catch (error) {
    console.error("❌ Internal Server Error:", error);
  }
});
