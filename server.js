const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const fs = require('fs');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const { v4: uuidv4 } = require('uuid');
const {checkNameExists, checkEmailExists, checkEmailUSIU, checkPassword, checkRoom, calculatePrices, calculateTotal} = require('./validate');

//for live connection:
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
app.use(connectLiveReload());

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', function (request, response) {
  response.render('homePage');
});

app.post('/overviewPage', urlEncodedParser, function (request, response) {
  const name = request.body.username;
  const email = request.body.email;
  const password = request.body.password;
  const room = parseInt(request.body.room);

  let verify_Name = checkNameExists(name);
  let verify_Email = checkEmailExists(email);
  let verify_USIU_Email = checkEmailUSIU(email);
  let verify_Password = checkPassword(password);
  let verify_Room = checkRoom(room);

  if(verify_Name==="Name already exists!"){
    response.render('homePage', {
      errorMessage: 'Username already exists!',
    });
  }
  else if(verify_Name==="Name doesn't exist!"){
    if(verify_Email==="Email already exists!"){
      response.render('homePage', {
        errorMessage: 'Email already exists!',
      });
    }
    else{
      if(verify_USIU_Email==="Invalid email!"){
        response.render('homePage', {
          errorMessage: 'Wrong email format!',
        });
      }
      else{
        if(verify_Password==="Wrong!"){
          response.render('homePage', {
            errorMessage: 'Password must be at least 8 characters long!',
          });
        }
        else{
          if(verify_Room==="Wrong!"){
            response.render('homePage', {
              errorMessage: 'No such room!',
            });
          }
          else{
            response.render('overviewPage');
          }
        }
      }
    }
  }
});

app.get('/overviewPage', urlEncodedParser, function (request, response) {
    response.render('overviewPage');
});

app.get('/menu', function (request, response) {
  response.render('overviewPage');
});

app.get('/contact', function (request, response) {
  response.render('contact');
});

app.post('/calculate', urlEncodedParser, function (request, response) {
  const itemsString = request.body.total.split(",");
  const menu = ["USIU Branded Hoodie", "USIU Branded Mugs", "USIU Branded Tote Bags", "USIU Branded Caps", "USIU Branded Bottles"]
  let items = []
  let newtotal = ''
  for(let i=0; i<itemsString.length; i++){
    items.push(parseInt(itemsString[i]))
  }
  const prices = [2250, 600, 1600, 550, 600]
  let calculateTotalArray = calculatePrices(prices, items)
  if(calculateTotalArray === "Input numbers only!" || 
      calculateTotalArray === "Invalid price!" || 
      calculateTotalArray === "Invalid number of items!" ||
      calculateTotalArray === "Not arrays!" ||
      calculateTotalArray === "Wrong array sizes!"){
    response.render('charges', {"message":calculateTotalArray});
  }
  else{
    newtotal = calculateTotal(calculateTotalArray)
    response.render('charges', {"items":items, "prices":prices, "total":calculateTotalArray, "newtotal":newtotal, "menu":menu});
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
