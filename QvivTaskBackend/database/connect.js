// const mongoose = require('mongoose');
const fs = require('fs');
const mongoose = require('mongoose')
const path = require('path');

require('dotenv').config()
const uri = process.env.uri

// console.log(uri)

async function main() {
  await mongoose.connect(uri).then(()=>{
    console.log("Connected to Database");
  })
  .catch((e) => {
    console.log("Error in connection with database")
  })
}

module.exports = main