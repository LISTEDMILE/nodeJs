
const fs = require('fs');
const { json } = require('stream/consumers');

const requestListener = (req,res)=>{
    if(req.url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Landing Page</title></head>');
        
        res.write('<body><h1>It is Landing Page one... with url(/) \n\n try (/form) for the form...) </h1></body>');
        res.write('<h1> for checking (/form) (/products) (/) and (/ anything..)   </h1>');
        res.write('</html>');
        return res.end();
    }

    else if(req.url === '/form'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Form Page </title></head>');
        res.write('<body><h1>HI This is home page with url (/form) </h1>');
        res.write('<br><form action="/submit-details" method="POST">');
        res.write('<input type="text" name="username" placeholder="Enter your name"><br>');
        res.write('<label for="gender">Gender:<br></label>');
        res.write('<input type="radio" id="male" name="gender" value="Male">');
        res.write('<label for="male">:Male<br></label>');
        res.write('<input type="radio" id="female" name="gender" value="FeMale">');
        res.write('<label for="female">:Female<br></label>');
        res.write('<input type="submit" value="submit">');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    else if(req.url === '/products'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Products</title></head>');
        res.write('<body><h1>It is products one... with url(/products)  </h1></body>');
        res.write('</html>');
        return res.end();
    }

    else if(req.url === '/submit-details' && req.method =='POST'){

        const body=[];

        req.on("data",(chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        req.on("end",() => {

            const fullBody = Buffer.concat(body).toString();
            console.log(fullBody);


            const params = new URLSearchParams(fullBody);
            const bodyObject = {};


            for (const [key,val] of params.entries()){
                bodyObject[key]=val;
            }



            const jsonstring = JSON.stringify(bodyObject);

            fs.appendFile('user.txt',jsonstring,error => {
                res.statusCode = 302;
                res.setHeader('Location','/submit');
                console.log('Appended successfully..')

                return res.end();
            });

            
        });
        
        
    }

    else if(req.url === '/submit'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Products</title></head>');
        res.write('<body><h1>Your form has been submitted through url(/submit-details).It is submit one... with url(/submit)  </h1></body>');

        res.write('<h1>check user.txt </h1>');
        res.write('</html>');
        return res.end();
    }
    else{
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Products</title></head>');
        res.write('<body><h1>Hey this is the end page terminal is now terminated ... url (if not matched)  </h1></body>');
        res.write('</html>');
        res.end();
    }
}

module.exports = requestListener;


