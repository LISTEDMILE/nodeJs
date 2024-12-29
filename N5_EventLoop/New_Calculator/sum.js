const sumRequestHandler = (req,res) => {
    const body =[];
    req.on('data',chunk => {
        body.push(chunk);
    });

    // this time we declared result for example lets say (5) so agar sequence me chle to res overwrite ho jana chahiye but this is (async ans sync) req.on(end) ya req.on(data) to tab chlenge jab res end hoga ya data milega but res to usse pehle hmne print kra diya kyoki N4_wale folder wale calculator me to hmne wo req.on('end') ke andar rakha tha  to thik chla tha par is bar check out the result.....
    let result = "Not changed same as declared.";
    req.on('end',() => {
        const bodyStr = Buffer.concat(body).toString();
        const params = new URLSearchParams(bodyStr);
        const bodyObj = Object.fromEntries(params);
        result = Number(bodyObj.first) + Number(bodyObj.second);
        
            return res.end();
    });

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
                        font-size:40px;
                    }
                    div{
                        display:flex;
                        flex-direction:column;
                        justify-content: space-around;
                        align-items: center;
                        width:60%;
                        background-color: beige;
                        border:1px solid darkorange ;
                        padding:30px;
                        border-radius: 5px;
                        box-shadow: 0px 0px 10px 10px solid black;
                    }
                </style>
            </head>
            <body>
                This is the Calculator Page...
                <div>
                    <h3>${result}</h3>
                    <h6>as we have declared result above but it changed when the req ended but this time we have printed result before that.....</h6>
                </div>
            </body>
        </html>`)
        res.end();
}


module.exports = sumRequestHandler;