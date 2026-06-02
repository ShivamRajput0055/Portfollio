const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const personalRoutes = require("./routes/personal.route");
const connectDB = require("./config/database");
const flash = require("connect-flash");
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();
const app = express();
connectDB();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      collectionName: "sessions",
    }),
    cookie: { maxAge: 1000 * 30 },
  }),
);
app.use(flash());
app.use("", personalRoutes);
app.use((req, res) => {
  res.status(404).render("errorPage", {
    error: "404! Page Not Found.",
    code: 404,
  });
});
app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).render("errorPage", {
    error: "Internal Server Error",
    code: 500,
  });
});
app.listen(process.env.PORT, () => {
  console.log(
    `App is listening at this url: http://localhost:${process.env.PORT}`,
  );
});
