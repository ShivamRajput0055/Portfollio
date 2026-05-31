const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database is Connected Sucessfully...");
  } catch (error) {
    console.log(`Database cann't be Connected due to some issue ${error}`);
  }
};
module.exports = connectDB;
