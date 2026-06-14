const transporter = require('../config/mailer');

const sendEmail = async (req, res) => {
  try {
    const { type, data } = req.body;
    
    let toEmail = process.env.DEFAULT_TO_EMAIL;
    let subject = '';
    let html = '';

    if (type === 'contact') {
      subject = 'New Contact Form Submission from Wellness Physio Center';
      html = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.user_name}</p>
        <p><strong>Email:</strong> ${data.user_email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `;
    } else if (type === 'appointment') {
      subject = 'New Appointment Request from Wellness Physio Center';
      html = `
        <h2>New Appointment Request</h2>
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> ${data.first_name} ${data.last_name}</p>
        <p><strong>Date of Birth:</strong> ${data.date_of_birth}</p>
        <p><strong>Phone:</strong> ${data.user_phone}</p>
        <p><strong>Email:</strong> ${data.user_email}</p>
        <p><strong>Address:</strong> ${data.address}</p>
        <h3>Pain & Symptoms</h3>
        <p><strong>Pain Areas:</strong> ${data.pain_areas}</p>
        <p><strong>Pain Level:</strong> ${data.pain_level}/10</p>
        <p><strong>Affects Work:</strong> ${data.affects_work}</p>
        <p><strong>Affects Daily Activities:</strong> ${data.affects_daily}</p>
        <p><strong>Affects Sports/Hobbies:</strong> ${data.affects_sports}</p>
        <p><strong>Previous Pain:</strong> ${data.previous_pain}</p>
        <h3>Medical History</h3>
        <p><strong>Medications:</strong> ${data.medications}</p>
        <p><strong>Heart Problems:</strong> ${data.heart_problems}</p>
        <p><strong>Breathing Difficulties:</strong> ${data.breathing}</p>
        <p><strong>High Blood Pressure:</strong> ${data.blood_pressure}</p>
        <p><strong>Surgeries:</strong> ${data.surgeries}</p>
        <p><strong>Allergies:</strong> ${data.allergies}</p>
        <h3>Additional Information</h3>
        <p>${data.additional_info}</p>
      `;
    } else if (type === 'pricing') {
      if (data.plan_name === 'Therapy Sessions') {
        toEmail = 'ap4703491@gmail.com';
      }
      subject = `New ${data.plan_name} Inquiry - Wellness Physio Center`;
      html = `
        <h2>New Plan Inquiry</h2>
        <p><strong>Name:</strong> ${data.user_name}</p>
        <p><strong>Email:</strong> ${data.user_email}</p>
        <p><strong>Phone:</strong> ${data.user_phone}</p>
        <p><strong>Plan:</strong> ${data.plan_name}</p>
        <p><strong>Session Type:</strong> ${data.session_type}</p>
        <p><strong>Plan Price:</strong> ${data.plan_price}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `;
    }

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: toEmail,
      subject: subject,
      html: html
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
};

module.exports = {
  sendEmail
};
