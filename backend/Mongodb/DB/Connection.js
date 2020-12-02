const mongoose = require('mongoose');

const URI = 'mongodb+srv://dbUser:dbUser@cluster0.xzbk6.mongodb.net/<dbname>?retryWrites=true&w=majority';


const connectDB = async () => {

  await mongoose.connect(URI,
    { useNewUrlParser: true,
      useUnifiedTopology:true
     });
  console.log('db connected...');




};

module.exports = connectDB;
