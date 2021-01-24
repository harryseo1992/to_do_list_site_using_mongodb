let Item = require('../models/itemsModel');
let top = require('../views/partials/myListTop');
let bottom = require('../views/partials/myListBottom');

exports.getListMinePage = function(req,res) {
    
    /* 
        retreive username / password in session
        saved in loginController.postLoginPage method
    */ 

    res.writeHead(200,{'Content-Type': 'text/html'} )

    /* If there is an existing user */
    // res.end();
    /*
    create a ul 
    <ul>
        <li>Sleeping</li>
        <li>Playing</li>
        .......
    </ul>
    */
   // send => top + ul + bottom
    
    // Variables userimage, username, and password defined to be used for items and user image on /list/mine
    let userimage = req.session.get('userimage');
    let username = req.session.get('username');
    let password = req.session.get('password');


    Item.find(function(err) {
        if(err) {console.log(err);}
        else {

            // finding the username value in items so we can list that in /list/mine
            Item.find({username:username, password:password}, function(err, records) {
                if (err) {console.log(err);}
                else {
                    // Create unordered list to list out items
                    let ul = '<ul>';

                    // Adds more info in unordered list by how many records it finds
                    for(let i =0 ; i< records.length; i++) {
                        let item = records[i].item;
                        let li = `<li>${item}</li>`;
                        ul = ul + li;
                    }
                    
                    // Encapsulate data after <ul> with </ul>
                    ul = ul + '</ul>';

                    // By using the userimage value from the session, created userimage to be displayed.
                    let userProfileLink = "https://randomuser.me/api/portraits/men/"+ userimage + ".jpg";
                    let img = `<img src=${userProfileLink}>`;
                    
                    // Combine and write all elements into one page and end
                    res.write(top + img + ul + bottom);
                    res.end();
                }
            });
            
        }
    });        
}

exports.postItemMinePage = function(req,res) {
    let username = req.session.get('username');
    // First define data as an empty array
    let data = [];
        // Push chunk of information gathered from request into data
        req.on('data', function(chunk) {
            data.push(chunk);
        })
        req.on('end', function() {
            // Same as saying str = item=sleep
            let str = Buffer.concat(data).toString();

            // Split so we only get "sleep" from item=sleep
            let info = str.split('=')[1];

            // Saving item elements with username so that we can better differentiate
            let _item = new Item({item: info, username: username});

            _item.save(function(err) {
                if(err) {console.log(err)}
                else {
                    res.writeHead(301, {'Location' : '/list/mine'});
                    res.end();
                }
            })
        })
}