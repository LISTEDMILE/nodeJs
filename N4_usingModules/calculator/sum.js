const sumRequestHandler = (req,res) => {
    const body =[];
    req.on('data',chunk => {
        body.push(chunk);
    });
    req.on('end',() => {
        const bodyStr = Buffer.concat(body).toString();
        const params = new URLSearchParams(bodyStr);
        const bodyObj = Object.fromEntries(params);
        const result = Number(bodyObj.first) + Number(bodyObj.second);
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
                        <h3>${result}</h3>
                    </div>
                </body>
            </html>`)
            return res.end();
    });
}


module.exports = sumRequestHandler;