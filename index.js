const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Choose your desired email service, e.g. Gmail, Yahoo, etc.
        auth: {
            user: 'email', // Your email address
            pass: 'password', // Your email password
        },
    });


    // Define the email options
    const mailOptions = {
        from: 'email', // Your email address
        to,
        subject,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
                .container {
                    background-color: #f8f9fa;
                    padding: 20px;
                    border-radius: 5px;
                }
                h1 {
                    color: #343a40;
                }
                p {
                    color: #6c757d;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Smart Attendance Management System Authentication Code</h1>
                <p>Your authentication code is ${text}</p>
            </div>
        </body>
        </html>
        `,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).json({ message: 'Failed to send email', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
