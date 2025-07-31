# Email Campaign Scheduler

A Node.js web application that allows users to create and schedule email campaigns to be sent at specific times. The application features automated email scheduling using cron and a web interface for campaign management.

## Features

- 📧 **Create Email Campaigns**: Design email campaigns with custom titles and messages
- 📅 **Schedule Emails**: Set specific dates and times for email delivery
- 👥 **Multiple Recipients**: Send campaigns to multiple email addresses
- ⏰ **Automated Scheduling**: Uses cron jobs to automatically send emails at scheduled times
- 📊 **Campaign Status Tracking**: Monitor campaign status (pending, sent, failed)

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Templating Engine**: EJS
- **Email Service**: Nodemailer (Gmail SMTP)
- **Task Scheduling**: node-cron
- **Environment Management**: dotenv

## Project Structure

```
Email Campaign Scheduler/
├── controllers/
│   └── campaignController.js    # Campaign business logic
├── database/
│   └── databaseConnection.js    # MongoDB connection setup
├── models/
│   └── CampaignModel.js        # Campaign data model
├── public/                     # Static files (CSS, JS, images)
├── routes/
│   └── CampaginRoutes.js       # Application routes
├── utility/
│   ├── Nodemailer.js          # Email sending utility
│   └── ScheduleEmail/
│       └── EmailScheduler.js   # Cron job for email scheduling
├── views/
│   ├── campaign.ejs           # Campaign listing page
│   └── createCampaign.ejs     # Campaign creation form
├── package.json
└── server.js                  # Application entry point
```

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/kanav789/EmailCampaignScheduler.git
   cd EmailCampaignScheduler
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/email-campaign-scheduler
   Email_User=your-email@gmail.com
   Email_Password=your-app-password
   ```

   **Note**: For Gmail, you'll need to:

   - Enable 2-factor authentication
   - Generate an app-specific password
   - Use the app password in the `Email_Password` field

4. **Start MongoDB**

   Make sure MongoDB is running on your system:

   ```bash
   # For Windows (if MongoDB is installed as a service)
   net start MongoDB

   # For macOS/Linux
   sudo systemctl start mongod
   ```

## Usage

1. **Start the development server**

   ```bash
   npm run dev
   ```

2. **Access the application**

   Open your browser and navigate to `http://localhost:3000`

3. **Create a campaign**

   - Fill in the campaign title
   - Write your email message (supports HTML)
   - Add recipient email addresses (comma-separated)
   - Set the scheduled date and time
   - Click "Create Campaign"

4. **View campaigns**

   Navigate to `/campaign` to see all created campaigns and their status

## API Endpoints

| Method | Endpoint          | Description                    |
| ------ | ----------------- | ------------------------------ |
| `GET`  | `/`               | Display campaign creation form |
| `POST` | `/createCampaign` | Create a new email campaign    |
| `GET`  | `/campaign`       | View all campaigns             |

## Database Schema

### Campaign Model

```javascript
{
  title: String,           // Campaign title
  message: String,         // Email content (HTML supported)
  recipients: [String],    // Array of recipient email addresses
  scheduledTime: Date,     // When to send the campaign
  status: String,          // 'pending', 'sent', or 'failed'
  createdAt: Date         // Campaign creation timestamp
}
```

## Email Scheduling

The application uses a node-cron that runs every minute to check for pending campaigns. When a campaign's scheduled time is reached:

1. The system retrieves all pending campaigns with `scheduledTime <= current time`
2. For each campaign, emails are sent to all recipients
3. Campaign status is updated to 'sent' (if all emails succeeded) or 'failed'
4. The process repeats every minute

## Environment Variables

| Variable         | Description                         | Required |
| ---------------- | ----------------------------------- | -------- |
| `PORT`           | Server port (default: 3000)         | No       |
| `MONGODB_URI`    | MongoDB connection string           | Yes      |
| `Email_User`     | Email account for sending           | Yes      |
| `Email_Password` | Email account password/app password | Yes      |

## Development

- **Start development server**: `npm run dev`
- **The application uses ES6 modules** (`"type": "module"` in package.json)
- **Hot reloading** is enabled via nodemon
- **MongoDB connection** is established on application startup

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

### Common Issues

1. **MongoDB Connection Error**

   - Ensure MongoDB is running
   - Check the `MONGODB_URI` in your `.env` file

2. **Email Not Sending**

   - Verify Gmail app password is correct
   - Check SMTP settings
   - Ensure 2FA is enabled on Gmail account

3. **Scheduled Emails Not Working**
   - Check server logs for cron job errors
   - Verify scheduled time format
   - Ensure the application is running continuously

## Support

For support and questions, please open an issue on the GitHub repository.
