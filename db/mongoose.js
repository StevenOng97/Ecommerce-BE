const mongoose = require('mongoose');

module.exports = async function connection() {
  console.log("About Connection");
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(process.env.MONGODB_URL, connectionParams);
    console.log('Connected to database!');
  } catch (err) {
    console.log('error', err);
    console.log('Unable to connect to database!');
  }
};
