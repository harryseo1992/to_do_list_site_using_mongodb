let fs = require('fs');
let path = require('path');
let User = require('../models/usersModel');

exports.getLoginPage = function(req,res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    // the complete path to login.html
    let loginHtmlPath = path.join(__dirname,'..','views','login.html');
    
    fs.readFile(loginHtmlPath, function(err,data) {
        if(err) {
            console.log(err)
        } else {
            res.write(data.toString())
        }
        res.end();
    });
}

exports.postLoginPage = function(req,res) {
    let data = [];

        req.on('data', function(chunk) {
            console.log(chunk);
            data.push(chunk);
        })

        req.on('end', function() {
            let _info = Buffer.concat(data).toString();
            // console.log(_info); // username=sandy&password=12345
            
            let pieces = _info.split('&');
            // pieces = ['username=sandy','password=12345']

            // pieces[0] = username=sandy
            // pieces[0].spit('=') = ['username','sandy']
            // pieces[0].spit('=')[1] = sandy
            let username = pieces[0].split('=')[1];

            // pieces[1] = password=12345
            // pieces[1].spit('=') = ['password','12345']
            // pieces[1].spit('=')[1] = 12345
            let password = pieces[1].split('=')[1];

            User.find({username:username, password:password}, function(err,records) {
                if(err) {console.log(err);}
                else {
                    if(records.length==1) {

                        /* Save username / password using session */
                        req.session.put('username',username);
                        req.session.put('pword',password);
                        req.session.put('userimage',records[0].userimage);
                        
                        res.writeHead(301, {'Location' : '/list/all'});
                        res.end();
                    } else {
                        res.writeHead(301, {'Location' : '/'});
                        res.end();

                    }
                }
            });
        });
}