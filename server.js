const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configure email transporter
// You'll need to set up environment variables for email configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Test email connection
transporter.verify(function (error, success) {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email service is ready to send emails');
  }
});

// API endpoint to send service request
app.post('/api/send-service-request', async (req, res) => {
  try {
    const { name, email, phone, serviceType, address, description, preferredDate } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !serviceType || !address || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields',
      });
    }

    // Email to business
    const businessEmailContent = `
      <h2>New Service Request from BHA Electrical LLC Website</h2>
      <p><strong>Customer Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <p><strong>Phone:</strong> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></p>
      <p><strong>Service Type:</strong> ${escapeHtml(serviceType)}</p>
      <p><strong>Property Address:</strong> ${escapeHtml(address)}</p>
      <p><strong>Preferred Date:</strong> ${escapeHtml(preferredDate) || 'Not specified'}</p>
      <h3>Description:</h3>
      <p>${escapeHtml(description).replace(/\n/g, '<br>')}</p>
    `;

    // Email to customer
    const customerEmailContent = `
      <h2>Thank You for Your Service Request</h2>
      <p>Dear ${escapeHtml(name)},</p>
      <p>We have received your service request and will review it shortly. Our team will contact you within 24 business hours at the phone number you provided.</p>
      <h3>Your Request Details:</h3>
      <p><strong>Service Type:</strong> ${escapeHtml(serviceType)}</p>
      <p><strong>Property Address:</strong> ${escapeHtml(address)}</p>
      <p><strong>Description:</strong></p>
      <p>${escapeHtml(description).replace(/\n/g, '<br>')}</p>
      <hr>
      <p><strong>Contact Information:</strong></p>
      <p>BHA Electrical LLC<br>
      Phone: (555) 123-4567<br>
      Email: info@bhaelectrical.com<br>
      Address: 123 Electric Lane, Springfield, IL 62701</p>
      <p>Thank you for choosing BHA Electrical LLC!</p>
    `;

    // Send email to business
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.BUSINESS_EMAIL || process.env.EMAIL_USER,
      subject: `New Service Request from ${name}`,
      html: businessEmailContent,
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Service Request - BHA Electrical LLC',
      html: customerEmailContent,
    });

    res.json({
      success: true,
      message: 'Service request sent successfully!',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing your request. Please try again later.',
    });
  }
});

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`BHA Electrical LLC website is running on port ${PORT}`);
});

// Helper function to escape HTML
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
