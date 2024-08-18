const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json()); // Parse JSON request bodies

// Configure the email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password'
    }
});

// Endpoint to handle the email sending
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Message from your website',
        text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Failed to send email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully.');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});