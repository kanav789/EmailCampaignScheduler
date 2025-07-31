import express from "express";
import dotenv from "dotenv";
import dbConnect from "./database/databaseConnection.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import "./utility/ScheduleEmail/EmailScheduler.js";
dotenv.config();
dbConnect();

// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// creating an express app
const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use path.join with recreated __dirname
app.use(express.static(join(__dirname, "public")));

// Routes

import campaignRoutes from "./routes/CampaginRoutes.js";

app.use("/", campaignRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
