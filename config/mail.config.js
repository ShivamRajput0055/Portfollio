const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
// const transporter = nodemailer.createTransport({
//   // host: "smtp.gmail.com",
//   // port: 587,
//   // secure: false,
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD,
//   },
//   // family: 4, // ⭐ IMPORTANT FIX (IPv4 force)
// });
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  family: 4, // ← Yahi fix karega - force IPv4
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
if (process.env.NODE_ENV === "development") {
  //ye sirf ek baar chalega kyu ki ye route pe nhi hain matalb route main rahta toh haarek baar chalta refresh hone ka sath lekin ye act like middleware sirf ek baar chalega
  transporter.verify((error) => {
    if (error) {
      console.error("SMTP Connection Failed:", error.message);
    } else {
      console.log("SMTP Server is ready.");
    }
  });
}
module.exports = transporter;
