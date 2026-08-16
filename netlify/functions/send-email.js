const nodemailer = require('nodemailer');

// Initialize email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.handler = async (event) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { name, email, phone, serviceType, description } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !serviceType) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const businessEmail = process.env.BUSINESS_EMAIL || process.env.EMAIL_USER;

    // Email to business
    const businessMailOptions = {
      from: process.env.EMAIL_USER,
      to: businessEmail,
      subject: `New Service Request from ${name}`,
      html: `
        <h2>New Service Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
        <p><strong>Service Type:</strong> ${escapeHtml(serviceType)}</p>
        <p><strong>Description:</strong></p>
        <p>${escapeHtml(description || 'No description provided').replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This email was sent from your BHA Electrical website form.</em></p>
      `,
    };

    // Email to customer
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'BHA Electrical LLC - Service Request Received',
      html: `
        <h2>Thank You for Your Service Request</h2>
        <p>Dear ${escapeHtml(name)},</p>
        <p>We have received your service request for <strong>${escapeHtml(serviceType)}</strong>.</p>
        <p>Our team will review your request and contact you shortly at <strong>${escapeHtml(email)}</strong>.</p>
        <p>If you provided a phone number, we may reach out to you there as well.</p>
        <hr>
        <p><strong>BHA Electrical LLC</strong></p>
        <p>Professional Electrical Services</p>
        <p><em>Thank you for choosing us!</em></p>
      `,
    };

    // Send both emails
    await transporter.sendMail(businessMailOptions);
    await transporter.sendMail(customerMailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Email error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email', details: error.message }),
    };
  }
};

// Helper function to escape HTML entities
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
