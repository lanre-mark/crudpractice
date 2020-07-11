const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB is connected....');
  } catch (err) {
    console.log(err.message);
    process.exit();
  }
};

module.exports = connectDB;
