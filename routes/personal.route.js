const express = require("express");
const router = express.Router();
const {
  homePage,
  resumePage,
  contactPage,
} = require("../controllers/personal.controller");
router.get("", homePage);
router.get("/resume/Shivam_Kumar_Resume", resumePage);
router.post("/contact", contactPage);
module.exports = router;
