# BHA Electrical LLC - Website Quick Start Guide

## ✅ What's Been Created

Your professional electrician business website is now ready! Here's what's included:

### 📄 **Website Pages & Sections**

1. **Navigation Bar** - Professional header with business name and menu links
2. **Hero Section** - Eye-catching welcome message with call-to-action button
3. **Services Section** - 6 service cards showcasing:
   - Residential Electrical
   - Commercial Electrical
   - Repairs & Troubleshooting
   - Panel Upgrades
   - Lighting Installation
   - Safety Inspections

4. **Contact Information** - Professional contact cards with:
   - Phone: (555) 123-4567
   - Email: info@bhaelectrical.com
   - Address: 123 Electric Lane, Springfield, IL 62701
   - Hours: Mon-Fri 8-5, Sat 9-2

5. **Service Request Form** - Customer form with fields for:
   - Full name, email, phone
   - Service type (dropdown)
   - Property address
   - Detailed description
   - Preferred service date
   - Real-time validation and success messages

6. **Footer** - Professional footer with copyright and credentials

### 📁 **Files Created**

```
Website/
├── public/                  # Files served to website visitors
│   ├── index.html          # Main website HTML
│   ├── css/
│   │   └── main.css        # Professional styling
│   ├── js/
│   │   └── app.js          # Form handling JavaScript
│   └── img/                # Images directory
├── css/
│   └── main.css            # Copy of CSS
├── js/
│   └── app.js              # Copy of JavaScript
├── server.js               # Express backend server
├── package.json            # Project dependencies
├── .env                    # Email configuration (TO UPDATE)
├── .env.example            # Email template
├── SETUP.md                # Detailed setup instructions
└── index.html              # Copy of main HTML
```

### 🎨 **Design Features**

- Professional green (#1a472a) and gold (#f59e0b) color scheme
- Fully responsive (works on desktop, tablet, mobile)
- Modern, clean design
- Smooth animations and hover effects
- Fast loading performance

---

## 🚀 **Quick Start (3 Steps)**

### Step 1: Update Contact Information
Edit `/home/tracy/IdeaProjects/Website/public/index.html` or `index.html`

Find and replace these with YOUR actual details:
- Phone: (555) 123-4567
- Email: info@bhaelectrical.com
- Address: 123 Electric Lane, Springfield, IL 62701
- Hours: Mon-Fri: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 2:00 PM

### Step 2: Configure Email (Choose One Option)

**Option A: Using Gmail** ⭐ Recommended
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Copy the 16-character password
4. Edit `.env` file in the Website folder:
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-real-email@gmail.com
   EMAIL_PASSWORD=paste-16-char-password-here
   BUSINESS_EMAIL=your-business-email@gmail.com
   ```

**Option B: Using another email service**
- Update `EMAIL_SERVICE` with the provider (outlook, yahoo, etc.)
- Update `EMAIL_USER` and `EMAIL_PASSWORD`
- Update `BUSINESS_EMAIL` where you want to receive requests

### Step 3: Start the Website
```bash
cd /home/tracy/IdeaProjects/Website
npm start
```

Visit: http://localhost:3000 in your browser

---

## 📧 **Email Setup Detailed Instructions**

### For Gmail Users:

1. **Enable 2-Step Verification:**
   - Go to https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Follow the setup process

2. **Generate App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Click "Generate"
   - Google will create a 16-character password

3. **Update .env file:**
   ```
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  (copy the 16 characters)
   BUSINESS_EMAIL=your-business@gmail.com
   ```

4. **Restart the server:**
   ```bash
   npm start
   ```

### For Outlook/Microsoft Email:
```
EMAIL_SERVICE=outlook365
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
BUSINESS_EMAIL=business-email@outlook.com
```

### Testing the Email:
1. Start the server: `npm start`
2. Go to http://localhost:3000
3. Scroll to "Request Electrical Service"
4. Fill in the form and submit
5. Check your BUSINESS_EMAIL inbox (might be in spam folder initially)

---

## 📝 **How the Form Works**

1. Customer fills out the service request form
2. Clicks "Submit Service Request"
3. Form data is validated
4. Two emails are automatically sent:
   - **To Business:** Full request details for follow-up
   - **To Customer:** Confirmation email with their request details
5. Customer sees a success message

---

## 🔧 **Customization**

### Change Business Name
- Edit `index.html`: Find "BHA Electrical LLC" and replace
- File: Lines 6, 31

### Change Services
- Edit `index.html`: Look for `.services-grid` section
- Add/remove `.service-card` blocks with your services

### Change Colors
- Edit `css/main.css`: Look for `--primary-color` and `--secondary-color`
- Primary (green): #1a472a
- Secondary (gold): #f59e0b

### Change Hours/Address
- Edit `index.html`: Look for `.contact-info` section
- Update all contact details

---

## ⚠️ **Important Notes**

1. **Keep .env Private** - Never commit `.env` to public repositories
2. **Email Credentials** - Use app passwords, not your real password
3. **2FA Required** - Gmail requires 2-Step Verification for app passwords
4. **Test First** - Test the form before going live
5. **Spam Folder** - First emails might go to spam; mark as "Not Spam"

---

## 🐛 **Troubleshooting**

### "Email service is not ready"
- Check your `.env` file for errors
- Verify email credentials are correct
- For Gmail: confirm 2FA is enabled

### Form not sending
- Check browser console (F12) for JavaScript errors
- Look at server terminal for error messages
- Verify `.env` file is properly configured

### Website won't load
- Make sure `npm install` completed successfully
- Check that port 3000 is not in use
- Try: `npm start` again

### Emails not received
- Check spam/junk folder
- Verify BUSINESS_EMAIL in `.env` is correct
- Try sending a test from the form

---

## 📞 **Next Steps**

1. ✅ Update contact information
2. ✅ Configure email settings
3. ✅ Test the form
4. ✅ Deploy to your hosting (Heroku, AWS, Vercel, etc.)
5. ✅ Set up domain name
6. ✅ Customize colors/services as needed

---

## 💡 **Features Your Customers Will Love**

✨ Easy-to-use service request form
✨ Mobile-friendly design
✨ Instant confirmation emails
✨ Professional appearance
✨ Fast loading times
✨ Clear service descriptions
✨ Direct contact information
✨ Business hours posted

---

**Your website is ready to serve customers! 🎉**

For detailed technical information, see `SETUP.md`
