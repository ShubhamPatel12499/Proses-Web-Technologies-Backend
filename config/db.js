const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect("mongodb+srv://shubham:shubhampatel@cluster0.bhvfao0.mongodb.net/ProcessWebBackend?retryWrites=true&w=majority")

module.exports={
    connection
}