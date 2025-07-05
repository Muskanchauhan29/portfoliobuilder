      import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields.' }), { status: 400 });
    }
    // Basic email format check
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address.' }), { status: 400 });
    }
    // Set up transporter using SMTP credentials from environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return new Response(JSON.stringify({ error: 'Email service credentials are not configured.' }), { status: 500 });
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: email,
      to: 'muskchauhan296@gmail.com',
      subject: `Portfolio Contact Form from ${name}`,
      text: message + `\n\nFrom: ${name} <${email}>`,
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Contact API error:', err);
    return new Response(JSON.stringify({ error: 'Failed to send message.' }), { status: 500 });
  }
}
