var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  product = require('./routes/product');


var app = express();
//connect to mongodb general is the database name
mongoose.connect('mongodb+srv://Test:test@cluster0.rr20y.mongodb.net/products?retryWrites=true&w=majority')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/product',product);

app.listen(4000);
console.log('server 4000 port is running in backend for react-crud');
