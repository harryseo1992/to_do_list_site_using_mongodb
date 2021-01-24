// let fs = require('fs');
// let path = require('path');
let User = require('../models/usersModel');
let top = require('../views/partials/signupPageTop')
let bottom = require('../views/partials/signupPageBottom')

exports.getSignupPage = function(req,res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    // the complete path to login.html
    // let signupHtmlPath = path.join(__dirname,'..','views','signup.html');
    
    // fs.readFile(signupHtmlPath, function(err,data) {
    //     if(err) {
    //         console.log(err)
    //     } else {
    //         res.write(data.toString())
    //     }
    //     res.end();
    // });
    res.write(top + bottom);
    res.end();
}

exports.postSignupPage = function(req,res) {
    let data = [];

        req.on('data', function(chunk) {
            console.log(chunk);
            data.push(chunk);
        })

        req.on('end', function() {
            let _info = Buffer.concat(data).toString();
            // console.log(_info);})} // username=sandy&password=12345
            
            let pieces = _info.split('&');
            // pieces = ['username=sandy','password=12345', 'imagenumber=1']

            // pieces[0] = username=sandy
            // pieces[0].spit('=') = ['username','sandy']
            // pieces[0].spit('=')[1] = sandy
            let username = pieces[0].split('=')[1];

            // pieces[1] = password=12345
            // pieces[1].spit('=') = ['password','12345']
            // pieces[1].spit('=')[1] = 12345
            let password = pieces[1].split('=')[1];

            // console.log(username);
            // console.log(password);

            // pieces[2] = imagenumber=1
            // pieces[2].split('=') = ['imagenumber', '1']
            // pieces[2].split('=')[1] = 1
            let userimage = pieces[2].split('=')[1];
            // let userImage = document.createElement('img');
            // userImage.src = "https://randomuser.me/api/portraits/men/" + number_of_image + ".jpg";
            // userImage.setAttribute('id', 'userimage');

            let user = new User({username:username, password:password, userimage:userimage});

            User.find({username:username, password:password}, function(err,records) {
                if(err) {console.log(err);}
                else {
                    if(records.length==1) {
                        /* If there is an existing user */
                        let div = '<div>';
                        let errorcontent = 'User with specified username and password exists'
                        div = div + errorcontent + '</div>';
                        
                        res.write(top + div + bottom);
                        res.end();
                    } else {
                        user.save(function(err) {
                            if (err) { console.log(err)}
                            else { console.log('User was saved')};
                        })
                        
                        res.writeHead(301, {'Location' : '/'});
                        res.end();

                    }
                }
            });
        });
}