let top = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Form</title>
        <style>
            body { width: 50%; margin: 0 auto; font-family: Verdana, Geneva, Tahoma, sans-serif;}
            form {border: 1px solid teal; padding: 10px;}
            label { background-color: teal; color: white; padding: 3px;}
            h1 { background-color: teal; color: white; padding: 5px;}
            div { font-weight: bold; color: red;}
        </style>
    </head>
    <body>
        <h1> To Do List App SignUP</h1>
        <form action="/signup" method="POST">
            
            <label>Username</label>
            <input type="text" name='username' /><br> <br>
            
            <label>Password</label>
            <input type="password" name='password' /><br><br>

            <label>Image Number</label>
            <input type="text" name='imagenumber' placeholder="Enter between 1-99" /><br><br>

            <input type="submit" value="submit" />
        </form>
`;

module.exports = top;