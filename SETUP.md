# BHA Electrical LLC - Professional Website

A professional, responsive website for BHA Electrical LLC electrical services business.

## Features

✅ **Professional Homepage** - Modern design with hero section
✅ **Services Listing** - Display all electrical services offered
✅ **Contact Information** - Phone, email, address, and hours
✅ **Service Request Form** - Customers can request services
✅ **Email Notifications** - Automatic emails to business and customer confirmations
✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## Services Included

- Residential Electrical
- Commercial Electrical
- Repairs & Troubleshooting
- Panel Upgrades
- Lighting Installation
- Safety Inspections

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Clone or extract the project**
   ```bash
   cd /home/tracy/IdeaProjects/Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure email settings**
   - Copy `.env.example` to `.env`
   - Fill in your email configuration:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your email details:
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   BUSINESS_EMAIL=info@bhaelectrical.com
   ```

4. **For Gmail users:**
   - Enable 2-Step Verification on your Google account
   - Generate an App Password at https://myaccount.google.com/apppasswords
   - Use the 16-character password in `EMAIL_PASSWORD` field

5. **Start the server**
   ```bash
   npm start
   ```
   The website will be available at `http://localhost:3000`

6. **For development (auto-reload)**
   ```bash
   npm run dev
   ```

## Project Structure

```
├── index.html              # Main HTML file
├── css/
│   └── main.css           # Professional styling
├── js/
│   └── app.js             # Form handling and interactions
├── server.js              # Express backend server
├── package.json           # Dependencies and scripts
├── .env.example           # Environment variables template
└── README.md              # This file
```

## Customization

### Update Contact Information
Edit the contact details in `index.html`:
- Phone: (555) 123-4567
- Email: info@bhaelectrical.com
- Address: 123 Electric Lane, Springfield, IL 62701
- Hours: Monday-Friday 8:00 AM - 5:00 PM, Saturday 9:00 AM - 2:00 PM

### Modify Services
Add or remove services in the Services section of `index.html`

### Email Templates
Customize email content in `server.js` in the `/api/send-service-request` endpoint

### Styling
Adjust colors and styles in `css/main.css`:
- Primary Color: `#1a472a` (Professional Green)
- Secondary Color: `#f59e0b` (Professional Gold)

## Email Setup Guide

### Gmail Configuration
1. Go to https://myaccount.google.com/security
2. Enable "2-Step Verification"
3. Go to https://myaccount.google.com/apppasswords
4. Select "Mail" and "Windows Computer" (or your device)
5. Copy the 16-character password
6. Use it in the `.env` file

### Other Email Services
For services like Outlook, SendGrid, or others, update the `EMAIL_SERVICE` and auth credentials in `.env`

## How It Works

1. **Customer fills the form** with their service request details
2. **Form is submitted** to `/api/send-service-request` endpoint
3. **Server validates** all required fields
4. **Two emails are sent:**
   - Business receives customer request details
   - Customer receives confirmation email
5. **User sees success message** on the website

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Security

- Email addresses are validated
- HTML content is escaped to prevent injection
- Form data is validated server-side
- Environment variables keep sensitive data secure

## Troubleshooting

### Form not sending?
- Check that `.env` file is configured correctly
- Verify email service credentials
- Check browser console for errors (F12)
- Look at server logs for detailed error messages

### Emails not received?
- Check spam folder
- Verify email service is working: `npm start` shows "Email service is ready"
- For Gmail, verify app password is correct and 2FA is enabled

### CSS not loading?
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Restart the server

## License

This website is provided for BHA Electrical LLC.

## Support

For technical issues or customization needs, contact your web development team.
