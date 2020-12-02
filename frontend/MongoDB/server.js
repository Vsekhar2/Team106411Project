const express = require('express');
const connectDB = require('./DB/Connection');
const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use('/API/userModel', require('./API/User'))
const Port = process.env.Port || 4000 ;

app.listen(Port, ()=>console.log('Server Started'));
