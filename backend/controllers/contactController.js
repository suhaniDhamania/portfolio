const FileDb = require('../models/fileDb');
const nodemailer = require('nodemailer');
const https = require('https');

// Helper to send email via Resend API using native Node.js https module
const sendEmailWithResend = (apiKey, { from, to, subject, text, replyTo }) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      text,
      reply_to: replyTo
    });

    const options = {
      hostname: 'api.resend.com',
      port: 443,
      path: '/emails',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            resolve(body);
          }
        } else {
          reject(new Error(`Resend API returned status code ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(data);
    req.end();
  });
};

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

    // 2. Try sending using Resend if API key is present
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailUser = process.env.EMAIL_USER || 'suhanidhamania157@gmail.com';
    let emailSent = false;

    if (resendApiKey && resendApiKey.trim() !== '') {
      try {
        console.log('Attempting to send email via Resend...');
        // Resend free tier allows sending from onboarding@resend.dev to the registered account email
        const mailOptions = {
          from: `${cleanedName} <onboarding@resend.dev>`,
          to: emailUser,
          subject: `New Portfolio Message: ${cleanedName}`,
          text: `Name: ${cleanedName}\nEmail: ${cleanedEmail}\n\nMessage:\n${cleanedMessage}`,
          replyTo: cleanedEmail
        };
        await sendEmailWithResend(resendApiKey, mailOptions);
        console.log('Email sent successfully via Resend');
        emailSent = true;
      } catch (resendError) {
        console.error('Resend Error:', resendError.message);
        // Fallback will run next if nodemailer is configured
      }
    }

    // 3. Fallback to Nodemailer if Resend was not used or failed
    if (!emailSent) {
      const emailPass = process.env.EMAIL_PASS;
      if (emailUser && emailPass && emailPass.trim() !== '') {
        console.log('Attempting to send email via Nodemailer fallback...');
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
            console.error('Nodemailer Fallback Error:', err);
          } else {
            console.log('Email sent successfully via Nodemailer fallback:', info.response);
          }
        });
      } else {
        console.warn('No working email method configured (Resend failed/missing and Nodemailer credentials missing)');
      }
    }

    res.status(201).json({ success: true, message: 'Message logged successfully.' });
  } catch (error) {
    console.error('Error handling contact submission:', error);
    res.status(500).json({ error: 'Failed to record your contact request.' });
  }
};
