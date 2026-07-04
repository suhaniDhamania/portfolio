const FileDb = require('../models/fileDb');
const nodemailer = require('nodemailer');

exports.submitContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message || name.trim() === '' || email.trim() === '' || message.trim() === '') {
    return res.status(400).json({ error: 'All fields (name, email, message) are required.' });
  }

  const cleanedName = name.trim();
  const cleanedEmail = email.trim();
  const cleanedMessage = message.trim();

  try {
    // 1. Save to local JSON database
    FileDb.saveContactMessage({
      name: cleanedName,
      email: cleanedEmail,
      message: cleanedMessage
    });

    // 2. Check if Nodemailer config is provided in env
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (emailUser && emailPass && emailPass.trim() !== '') {
      // Setup SMTP transporter (Gmail example)
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPass
        }
      });

      const mailOptions = {
        from: `"${cleanedName}" <${emailUser}>`,
        to: emailUser,
        subject: `New Message: ${cleanedName}`,
        text: `Name: ${cleanedName}\nEmail: ${cleanedEmail}\n\nMessage:\n${cleanedMessage}`,
        replyTo: cleanedEmail
      };

      // Send mail
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error('Nodemailer Error:', err);
        } else {
          console.log('Email sent successfully:', info.response);
        }
      });
    }

    res.status(201).json({ success: true, message: 'Message logged successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record your contact request.' });
  }
};
