const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.static("public"));

// Route to handle sending form as email
app.post("/send-form", async (req, res) => {
  const { image } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "zhenxingzheng131@gmail.com", // replace
      pass: "dbxg fguh btyg qfkl",    // replace with app password
    },
  });

  const mailOptions = {
    from: "zhenxingzheng131@gmail.com",
    to: "zhenxingzheng131@gmail.com",
    subject: "New Client Form Submission",
    text: "A new client has submitted a form.",
    attachments: [
      {
        filename: "client_form.png",
        content: image.split("base64,")[1],
        encoding: "base64",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Form sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending email.");
  }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
