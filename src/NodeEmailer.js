import { https } from "firebase-functions";
import { initializeApp, firestore } from "firebase-admin";
import { createTransport } from "nodemailer";

initializeApp();
const db = firestore();

// Configure Nodemailer transport using SMTP (or replace with your email service)
const transporter = createTransport({
  service: "gmail", // You can use other services like Outlook, Yahoo, etc.
  auth: {
    user: "srisuryakumar808@gmail.com",
    pass: "newaccount", // Use environment variables for security
  },
});

export const saveFormAndSendEmail = https.onRequest(async (req, res) => {
  try {
    const formData = req.body;

    // Save form data to Firestore or Realtime Database
    const docRef = await db.collection("forms").add(formData);

    // Prepare email data
    const mailOptions = {
      from: "srisuryakumar808@gmail.com",
      to: "sampathsrikakulapu@example.com", // Replace with the recipient's email
      subject: "New Form Submission",
      text: `Form Data: ${JSON.stringify(formData)}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .send(`Form saved with ID: ${docRef.id} and email sent successfully.`);
  } catch (error) {
    console.error("Error saving form or sending email:", error);
    res.status(500).send("Error saving form or sending email");
  }
});
