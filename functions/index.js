const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true }); // Enable CORS for all origins
const express = require("express");

admin.initializeApp();
const db = admin.firestore();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "srisuryakumar808@gmail.com",
    pass: "ehhj yltn ebzk bxdz",
  },
});

exports.saveFormAndSendEmail = functions.https.onRequest(async (req, res) => {
  cors(
    req,
    res,
    async () => {
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
          .send(
            `Form saved with ID: ${docRef.id} and email sent successfully.`
          );
      } catch (error) {
        console.error("Error saving form or sending email:", error);
        res
          .status(500)
          .send("Error saving form or sending email: " + JSON.stringify(error));
      }
    },
    {
      cors: false, // Disable CORS
    }
  );
});

exports.getFormSubmissions = functions.https.onRequest((req, res) => {
  cors(
    req,
    res,
    async () => {
      try {
        if (req.method === "OPTIONS") {
          res.set("Access-Control-Allow-Origin", "*");
          res.set("Access-Control-Allow-Methods", "GET, POST");
          res.set("Access-Control-Allow-Headers", "Content-Type");
          res.set("Access-Control-Max-Age", "3600");
          return res.status(204).send(""); // No content for OPTIONS
        }

        if (req.method !== "GET") {
          return res.status(405).send("Method Not Allowed");
        }

        const express = require("express");
        const cors = require("cors");
        const app = express();

        app.use(cors({ origin: "http://localhost:5173" }));

        const formSubmissionsRef = db.collection("forms");
        const snapshot = await formSubmissionsRef.get();

        let submissions = [];
        snapshot.forEach((doc) => {
          submissions.push({ id: doc.id, ...doc.data() });
        });

        return res.status(200).json({ success: true, data: submissions });
      } catch (error) {
        console.error("Error retrieving form submissions:", error);
        return res.status(500).json({ success: false, error: error.message });
      }
    },
    {
      cors: false, // Disable CORS
    }
  );
});

exports.getPaginatedData = functions.https.onCall(async (data, context) => {
  const pageSize = data.pageSize || 10;
  const page = data.page || 0;

  const collection = admin.firestore().collection("yourCollection");
  const snapshot = await collection
    .orderBy("someField") // Sorting logic
    .offset(page * pageSize)
    .limit(pageSize)
    .get();

  const results = [];
  snapshot.forEach((doc) => {
    results.push({ id: doc.id, ...doc.data() });
  });

  return { results, total: snapshot.size };
});
