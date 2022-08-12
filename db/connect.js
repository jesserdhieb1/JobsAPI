const mongoose = require('mongoose')

const connectDB = (url) => {
  console.log('Server Connected With DataBase ...')
  return mongoose.connect(url)
}

module.exports = connectDB
