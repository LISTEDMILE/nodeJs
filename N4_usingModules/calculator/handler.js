const sumRequestHandler = require('./sum');

const handler = (req,res) => {
    if (req.url === '/'){
        res.write(`<!DOCTYPE html>
            <html>
                <head>
                    <title>
                        Landing Page
                    </title>
                    <style>
                        body{
                            height: 100vh;
                            width:100vw;
                            display:flex;
                            flex-direction: column;
                            justify-content: space-around;
                            align-items: center;
                            font-size:60px;
                        }
                        #div{
                            display:flex;
                            justify-content: space-around;
                            align-items: center;
                            width:60%;
                            background-color: beige;
                            border:1px solid darkorange ;
                            border-radius: 5px;
                            margin-bottom:20px;
                            box-shadow: 0px 0px 10px 10px solid black;
                            a{
                                margin:8px;
                                background-color:white;
                                border:1px solid black;
                                border-radius:5px;
                                height:40%;
                                padding:5px 15px;
                                text-decoration:none;
                                font-size:20px;
            
                            }
                            a:hover{
                                background-color:yellow;
                            }
                        }
                    </style>
                </head>
                <body>
                    This is the Landing Page
                    <nav id="div">
                    <a href="/calculator">Lets move towards Calculator</a>
                    </nav id="div">
                </body>
            </html>`);
                    return res.end();
    }

    else if (req.url === '/calculator'){
        res.write(`<!DOCTYPE html>
            <html>
                <head>
                    <title>
                        Calculator
                    </title>
                    <style>
                        body{
                            height: 100vh;
                            width:100vw;
                            display:flex;
                            flex-direction: column;
                            justify-content: space-around;
                            align-items: center;
                            font-size:60px;
                        }
                        div{
                            display:flex;
                            justify-content: space-around;
                            align-items: center;
                            flex-direction:column;
                            width:60%;
                            background-color: beige;
                            border:1px solid darkorange ;
                            border-radius: 5px;
                            margin-bottom:20px;
                            box-shadow: 0px 0px 10px 10px solid black;
                        }
                    </style>
                </head>
                <body>
                    This is the Calculator Page...
                    <div>
                    <form action="/submit" method="POST">
                    <input type="number" name="first" placeholder="First NO.">
                    <input type="number" name="second" placeholder="Second NO.">
                    <input type="submit" value="Sum">
                    </form>
                    </div>
                </body>
            </html>`);
                    return res.end();
    }
    else if(req.url === '/submit' && req.method == 'POST'){
        return sumRequestHandler(req,res);
    }
    


    else{
        res.write(`<!DOCTYPE html>
            <html>
                <head>
                    <title>
                        Abe OO
                    </title>
                    <style>
                        body{
                            height: 100vh;
                            width:100vw;
                            display:flex;
                            flex-direction: column;
                            justify-content: space-around;
                            align-items: center;
                            font-size:60px;
                        }
                        #div{
                            display:flex;
                            justify-content: space-around;
                            align-items: center;
                            width:60%;
                            background-color: beige;
                            border:1px solid darkorange ;
                            border-radius: 5px;
                            margin-bottom:20px;
                            box-shadow: 0px 0px 10px 10px solid black;
                            a{
                                margin:8px;
                                background-color:white;
                                border:1px solid black;
                                border-radius:5px;
                                height:40%;
                                padding:5px 15px;
                                text-decoration:none;
                                font-size:20px;
            
                            }
                            a:hover{
                                background-color:yellow;
                            }
                        }
                    </style>
                </head>
                <body>
                    Pagal h kya ulti seedhi url dal rha ....
                    <nav id="div">
                    <a href="/">Le Landing Page pe ja</a>
                    </nav id="div">
                </body>
            </html>`);
                    return res.end();
    }
}


//also used to export but now in form of object....
module.exports = handler;