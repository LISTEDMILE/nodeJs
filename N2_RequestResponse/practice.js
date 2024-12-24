const http = require('http');
const server = http.createServer((req,res) => {
    if(req.url==='/'){ res.write(`<!DOCTYPE html>
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
                <a href="/cart">Cart</a>
                <a href="/home">Home</a>
                <a href="/oh">Oh</a>
                <a href="/bhai">Bhai</a>
                <a href="/yar">Yar</a>
                </nav id="div">
            </body>
        </html>`);
            res.end();}
    else if(req.url === '/home'){
        res.write(`<!DOCTYPE html>
<html>
    <head>
        <title>
            Home Page
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
        This is the Home Page
        <nav id="div">
        <a href="/">Landing Page</a>
        <a href="/cart">Cart</a>
        <a href="/oh">Oh</a>
        <a href="/bhai">Bhai</a>
        <a href="/yar">Yar</a>
        </nav id="div">
    </body>
</html>`);
        return res.end();
    }
    else if(req.url === '/cart'){
        res.write(`<!DOCTYPE html>
<html>
    <head>
        <title>
            Cart Page
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
        This is the Cart Page
        <nav id="div">
        <a href="/">Landing Page</a>
        <a href="/home">Home</a>
        <a href="/oh">Oh</a>
        <a href="/bhai">Bhai</a>
        <a href="/yar">Yar</a>
        </nav id="div">
    </body>
</html>`);
        return res.end();
    }
    else if(req.url === '/oh'){
        res.write(`<!DOCTYPE html>
<html>
    <head>
        <title>
            Oh Page
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
        This is the Oh Page
        <nav id="div">
        <a href="/">Landing Page</a>
        <a href="/home">Home</a>
        <a href="/cart">Cart</a>
        <a href="/bhai">Bhai</a>
        <a href="/yar">Yar</a>
        </nav id="div">
    </body>
</html>`);
        return res.end();
    }
    else if(req.url === '/yar'){
        res.write(`<!DOCTYPE html>
<html>
    <head>
        <title>
            Yar Page
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
        This is the Yar Page
        <nav id="div">
        <a href="/">Landing Page</a>
        <a href="/home">Home</a>
        <a href="/oh">Oh</a>
        <a href="/bhai">Bhai</a>
        <a href="/cart">Cart</a>
        </nav id="div">
    </body>
</html>`);
        return res.end();
    }
    else if(req.url === '/bhai'){
        res.write(`<!DOCTYPE html>
<html>
    <head>
        <title>
            Bhai Page
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
        This is the Bhai Page
        <nav id="div">
        <a href="/">Landing Page</a>
        <a href="/home">Home</a>
        <a href="/oh">Oh</a>
        <a href="/cart">Cart</a>
        <a href="/yar">Yar</a>
        </nav id="div">
    </body>
</html>`);
        return res.end();
    }
    else{
        res.write(`<!DOCTYPE html>
<html>
    <head>
        <title>
            Galat Page
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
        Abe jyada ungal mat kar galat page h ye bhagja jaldi...
        <nav id="div">
        <a href="/">Landing Page</a>
        <a href="/home">Home</a>
        <a href="/oh">Oh</a>
        <a href="/cart">Cart</a>
        <a href="/bhai">Bhai</a>
        <a href="/yar">Yar</a>
        </nav id="div">
    </body>
</html>`);
        return res.end();
    }

   
});
const PORT = 3000;
server.listen(PORT,()=>{
    console.log(`Running at https:/${PORT}`);
})