const mongoose = require("mongoose");

// useNewUrlParser
const options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true
};

mongoose.connect(
  "mongodb+srv://RamyAtassi:Strongo1!@personnalprojects-h50vd.mongodb.net/test?retryWrites=true&w=majority",
  options,
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("DATABASE IS CONNECTED");
    }
  }
);

module.exports = mongoose;
