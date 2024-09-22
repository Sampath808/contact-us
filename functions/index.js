const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();
const db = admin.firestore();

// Configure Nodemailer transport using SMTP (or replace with your email service)
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other services like Outlook, Yahoo, etc.
  auth: {
    user: "srisuryakumar808@gmail.com",
    pass: "ehhj yltn ebzk bxdz", // Use environment variables for security
  },
});

exports.saveFormAndSendEmail = functions.https.onRequest(async (req, res) => {
  try {
    res.set("Access-Control-Allow-Origin", "*");
    const formData = req.body;

    // Save form data to Firestore or Realtime Database
    const docRef = await db.collection("forms").add(formData);

    // Prepare email data
    const mailOptions = {
      from: "srisuryakumar808@gmail.com",
      to: "sampathsrikakulapu@gmail.com", // Replace with the recipient's email
      subject: "New Form Submission",
      text: `Form Data : ${JSON.stringify(formData)}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .send(`Form saved with ID: ${docRef.id} and email sent successfully.`);
  } catch (error) {
    console.error("Error saving form or sending email:", error);
    res
      .status(500)
      .send("Error saving form or sending email" + JSON.stringify(error));
  }
});

exports.testApi = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.status(200).send("Hello world123!!");
});
