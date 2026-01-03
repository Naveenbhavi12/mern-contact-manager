const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://user3013:3013@cluster0.genk0tz.mongodb.net/");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed. Is MongoDB running?");
  }
};

module.exports = connectDB;
