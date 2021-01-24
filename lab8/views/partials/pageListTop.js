let top = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>To do List</title>
        <style>
            body { width: 50%; margin: 0 auto; font-family: Verdana, Geneva, Tahoma, sans-serif;}
            form {border: 1px solid teal; padding: 10px;}
            label { background-color: teal; color: white; padding: 3px;}
            h1 { background-color: teal; color: white; padding: 5px;}
            span { font-weight: normal; font-size: 15px;}
            div { text-align: center; margin-bottom: 3vh;}
            .itemlinks { margin-left: 10vw; margin-right: 10vw;}
        </style>
    </head>
    <body>
        <h1> To do Items <span><a href='/'>log out</a></span></h1>
        <div> 
            <a class='itemlinks' href='/list/all'>All items</a>
            <a class='itemlinks' href='/list/mine'>My items</a>
        </div>
        <form action='/list/all' method="POST">
            <input type='text' name='item'>
            <input type="submit" value="submit" />
        </form>
        <br>
`;

module.exports = top;