const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true }); // Enable CORS for all origins
const express = require("express");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "POST",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

admin.initializeApp();
const db = admin.firestore();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "srisuryakumar808@gmail.com",
    pass: "ehhj yltn ebzk bxdz", // Use environment variables for security
  },
});

exports.saveFormAndSendEmail = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method === "OPTIONS") {
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Methods", "GET, POST");
        res.set("Access-Control-Allow-Headers", "Content-Type");
        res.set("Access-Control-Max-Age", "3600");
        return res.status(204).send(""); // No content for OPTIONS
      }

      // Parse form data (assuming it's JSON)
      const formData = req.body;

      // Check if formData is empty
      if (!formData || Object.keys(formData).length === 0) {
        return res.status(400).send("No form data received");
      }

      // Save form data to Firestore
      const docRef = await db.collection("forms").add(formData);

      // Configure email
      const mailOptions = {
        from: "srisuryakumar808@gmail.com",
        to: "sampathsrikakulapu@gmail.com",
        subject: "New Form Submission",
        text: `Form Data: ${JSON.stringify(formData, null, 2)}`,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      // Send success response
      res.set("Access-Control-Allow-Origin", "*");
      return res
        .status(200)
        .send(`Form saved with ID: ${docRef.id} and email sent successfully.`);
    } catch (error) {
      console.error("Error saving form or sending email:", error);
      res
        .status(500)
        .send("Error saving form or sending email: " + JSON.stringify(error));
    }
  });
});

exports.testApi = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.status(200).send("Hello world123!!");
});
