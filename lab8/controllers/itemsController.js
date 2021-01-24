
let Item = require('../models/itemsModel');
let top = require('../views/partials/pageListTop');
let bottom = require('../views/partials/pageListBottom');

exports.getListPage = function(req,res) {
    
    /* 
        retreive username / password in session
        saved in loginController.postLoginPage method
    */ 

    res.writeHead(200,{'Content-Type': 'text/html'} )

    /*
    create a ul 
    <ul>
        <li>Sleeping</li>
        <li>Playing</li>
        .......
    </ul>
    */
   // send => top + ul + bottom
    Item.find(function(err, records) {
        if(err) {console.log(err);}
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

            // Combine and write all elements into one page and end
            res.write(top + ul + bottom);
            res.end();
        }
    });        
}

exports.postItemPage = function(req,res) {

    // First define data as an empty array
    let data = [];

        // Push chunk of information gathered from request into data
        req.on('data', function(chunk) {
            data.push(chunk);
        })
        req.on('end', function() {

            let username = req.session.get('username');
            let password = req.session.get('password');
            // Same as saying str = item=sleep
            let str = Buffer.concat(data).toString();

            // Split so we only get "sleep" from item=sleep
            let info = str.split('=')[1];

            // Saving item elements
            let _item = new Item({item: info, username: username, password: password});

            _item.save(function(err) {
                if(err) {console.log(err)}
                else {
                    res.writeHead(301, {'Location' : '/list/all'});
                    res.end();
                }
            })
        })
}
