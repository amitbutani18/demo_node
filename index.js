const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customer = require('./routes/customers');
const authors = require('./routes/authors');
const courses = require('./routes/courses');
const user = require('./routes/users');
const auth = require('./routes/auth');
const error = require('./middleware/error');

const app = express();
 
if(!config.get('jwtPrivateKey')) {
    console.error('Something went wrong...........');
    process.exit(1);
}

console.log(config.get('jwtPrivateKey'));
 
mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true , useUnifiedTopology: true })
    .then(()=>console.log('DB connected successfully......'))
    .catch((err)=> console.log(err));

app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customer',customer);
app.use('/api/authors',authors);
app.use('/api/course',courses);
app.use('/api/users',user);
app.use('/api/auth',auth);

app.use(error);

const port = process.env.PORT || 3030;
app.listen(port, ()=>console.log(`Listening on port ${port}`));