import cron from "node-cron";
import CampaignModel from "../../models/CampaignModel";

cron.schedule("* * * * *", async () => {
  try {
    const date = new Date();
    const campaigns = await CampaignModel.find({
      status: "Pending",
      scheduledTime: { $lte: date },
    });
    for (const campaign of campaigns) {
      // Assuming sendEmail is a function that sends the email
      const success = await sendEmail({
        to: campaign.recipient,
        subject: campaign.subject,
        html: campaign.content,
      });
      if (!success) {
        allSent = false;
      }

      campaign.status = allSent ? "sent" : "failed";
      await campaign.save();
    }
  } catch (error) {
    console.log("Internal Server Error:", error);
  }
});
