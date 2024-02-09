import nodemailer from "nodemailer";
const { ADMIN_EMAIL } = process.env;

const handler = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  const { from, subject, message } = req.body;
  // console.log("🚀 ~ file: contact.js:19 ~ handler ~ from:", from)
  const msg = {
    to: from,
    // cc: ADMIN_EMAIL,
    from: ADMIN_EMAIL,
    subject,
    text: message,
    html: `<p>${message}</p>`,
  };
  // console.log("🚀 ~ file: contact.js:27 ~ handler ~ msg:", msg)

  try {
    let info = await transporter.sendMail(msg);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.status(201).json({ message: "Email sent", id: info.messageId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }
};

export default handler;