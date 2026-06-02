const path = require("path");
const fs = require("fs");
const projects = [
  {
    id: 1,
    title: "ApnaCart - E-Commerce Platform",
    description:
      "A modern e-commerce web application built with React.js featuring product browsing, cart management, user authentication, state management, and secure payment integration for a seamless shopping experience.",
    image: "/images/ecommerce.png",
    github: "https://github.com/ShivamRajput0055/Ecommerce-Project",
    liveDemo: "https://apnacart-ecommerce.vercel.app/",
    technologies: [
      "React.js",
      "Redux Toolkit",
      "Redux Saga",
      "JSON Server",
      "Bootstrap",
      "REST API",
    ],
  },
  {
    id: 2,
    title: "Student Record Management System",
    description:
      "A full-stack student management system built with Node.js, Express.js, MongoDB, and EJS. Features include student record management, image uploads, CRUD operations, RESTful APIs, authentication, and a scalable MVC architecture for efficient data handling.",
    image: "/images/student-management.png",
    github: "https://github.com/ShivamRajput0055/Connect_Frontend_With_Backend",
    liveDemo:
      "https://github.com/ShivamRajput0055/Connect_Frontend_With_Backend",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "EJS",
      "MVC Architecture",
      "Multer",
      "REST API",
    ],
  },
  {
    id: 3,
    title: "CRM Dashboard (Ongoing Project)",
    description:
      "An ongoing CRM dashboard project built with React.js, featuring reusable UI components, advanced form handling with React Hook Form, schema-based validation using Zod, and a responsive user interface designed for efficient customer and business data management.",
    image: "/images/crm-dashboard.png",
    github: "",
    liveDemo: "",
    technologies: [
      "React.js",
      "JavaScript",
      "React Hook Form",
      "Zod",
      "Bootstrap",
      "Reusable Components",
      "Form Validation",
    ],
  },
  {
    id: 4,
    title: "Movie Searching Website",
    description:
      "A responsive movie search web application built with HTML, CSS, JavaScript, and Bootstrap. Integrated external movie APIs to enable dynamic search functionality, real-time data rendering, and detailed movie information through an interactive user interface.",
    image: "/images/movie-search.png",
    github: "https://github.com/ShivamRajput0055/Movie_Searching_website",
    liveDemo: "https://movie-searching-website-eight.vercel.app/",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
      "REST API",
      "Asynchronous JavaScript",
      "API Integration",
    ],
  },
];
const homePage = (req, res) => {
  res.render("homePage", { projects, flash: req.flash("success") });
};
const resumePage = (req, res) => {
  const filePath = path.join(
    __dirname,
    "..",
    "public",
    "document",
    "resume.pdf",
  );
  if (!fs.existsSync(filePath)) {
    console.log(filePath);
    return res
      .status(404)
      .render("errorPage", { error: "Resume Not Found", code: 404 });
  } else {
    res.download(filePath, (error) => {
      if (error && !res.headersSent) {
        return res
          .status(500)
          .render("errorPage", { error: "Download Failed...", code: 500 });
      }
    });
  }
};

// const contactPage = async (req, res) => {
//   try {
//     const { name, email, subject, message } = req.body;
//     if (!name || !email || !subject || !message) {
//       return res.status(400).render("errorPage", {
//         error: "All fields are required",
//         code: 400,
//       });
//     }
//     const info = await transporter.sendMail({
//       from: '"Portfolio Message" <kunalsinghhjp2@gmail.com>',
//       to: "shivamsinghhjp2@gmail.com",
//       subject: subject,
//       text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
//     });

//     if (info.rejected.length > 0) {
//       return res.status(500).render("errorPage", {
//         error: "Message could not be delivered",
//         code: 500,
//       });
//     }
//     req.flash("success", "Mail was sent successfully!");
//     return res.status(200).redirect("/#contact");
//   } catch (err) {
//     let statusCode = 500;
//     let errorMessage = "Something went wrong. Please try again.";
//     console.log(err);
//     switch (err.code) {
//       case "ECONNECTION":
//       case "ETIMEDOUT":
//         statusCode = 503;
//         errorMessage = "Service unavailable. Please try again later.";
//         break;
//       case "EAUTH":
//         statusCode = 500;
//         errorMessage = "Server configuration error.";
//         break;
//       case "EENVELOPE":
//         statusCode = 400;
//         errorMessage = "Invalid email address.";
//         break;
//     }
//     return res.status(statusCode).render("errorPage", {
//       error: errorMessage,
//       code: statusCode,
//     });
//   }
// };
const contactPage = async (req, res) => {
  const { Resend } = require("resend");
  const resend = new Resend(process.env.SECRET_KEY_RESEND_EMAIL);
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).render("errorPage", {
        error: "All fields are required",
        code: 400,
      });
    }
    const { data } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "shivamsinghhjp2@gmail.com",
      subject: subject,
      text: `Name:${name},Email:${email},Subject:${subject},Message:${message}`,
    });
    console.log(data);
    req.flash("success", "Email was sent successfully!!");
    return res.status(200).redirect("/#contact");
  } catch (error) {
    return res.status(500).render("errorPage", {
      error: "Server Error Found",
      code: 400,
      errorMessage: error,
    });
  }
};
module.exports = {
  homePage,
  resumePage,
  contactPage,
};
