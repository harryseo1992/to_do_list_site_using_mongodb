let http = require('http');
let loginController = require('./controllers/loginController');
let itemController = require('./controllers/itemsController');
let SignUpController = require('./controllers/SignUpController')
let itemMineController = require('./controllers/ItemMineController')
let ErrorController = require('./controllers/ErrorController')

let NodeSession = require('node-session');

// https://www.npmjs.com/package/node-session
let session = new NodeSession({secret:'gajg761761','lifetime': 3000000});

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDatabase');

let db = mongoose.connection;
db.once('open', function() {
    console.log('Connection was succesfull');
})

http.createServer(function(req, res) {
    let method = req.method;
    let url = req.url;

    session.startSession(req,res,function() {
        if (method=='GET' && url=='/') {

            loginController.getLoginPage(req,res);
            
        } else if (method=='POST' && url=='/') {

            loginController.postLoginPage(req,res);

        } else if (method=='GET' && url=='/list/all') {
                
            itemController.getListPage(req,res);

        } else if (method=='POST' && url=='/list/all') {
                
            itemController.postItemPage(req,res);
        } else if (method=='GET' && url=='/list/mine') {

            itemMineController.getListMinePage(req,res);
        } else if (method=='POST' && url=='/list/mine') {

            itemMineController.postItemMinePage(req,res);
        } else if (method=='GET' && url=="/signup") {

            SignUpController.getSignupPage(req,res);
        } else if (method=='POST' && url=="/signup") {

            SignUpController.postSignupPage(req,res);
        } else {

            ErrorController.getErrorPage(req,res);
        }
    });

}).listen(3000);