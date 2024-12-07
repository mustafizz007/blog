const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  // set strict query to false
  mongoose.set("strict", false);

  try {
    await mongoose.connect(
      "mongodb+srv://mustafizsyl1973:Eh9R21sodHyo6qo2@cluster0.kmskk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/mustafiz",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
