import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make sure you're sending JSON data with the correct header
      const response = await axios.post(
        "https://us-central1-contact-us-387f1.cloudfunctions.net/saveFormAndSendEmail",
        formData,
        {
          headers: {
            "Content-Type": "application/json", // Explicitly set the content type
          },
        }
      );

      console.log("Form submitted successfully:", response.data);
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error saving contact information:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <Card>
      <div className="container">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </Card>
  );
};

export default Contact;
