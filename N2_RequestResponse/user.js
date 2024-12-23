
const http = require('http');
const fs = require('fs');

function requestListener(req,res){
    if(req.url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Landing Page</title></head>');
        
        res.write('<body><h1>It is Landing Page one... with url(/) \n\n try (/form) for the form...) </h1></body>');
        res.write('</html>');
        return res.end();
    }

    else if(req.url === '/form'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Form Page </title></head>');
        res.write('<body><h1>HI This is home page with url (/form) </h1>');

        // means data submitted to url (/submit-details) and POST means data leke jana bohot sara...
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
        fs.writeFileSync('user.txt','done');
        // fs module is used to handle file tasks   here we imported fs as var fs upperside here writeFileSync is used to write in a file what we want.
        //here we have written done in the file user.txt which will be saved to the same directory...

        res.statusCode = 302;
        // status code (statusCode) is used to show what we are gonna do with the setHeader one in the network section of inspect section...

        res.setHeader('Location','/submit');
        // setHeader (Location) is use to change location when we want..... 

        return res.end();
    }

    else if(req.url === '/submit'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Products</title></head>');
        res.write('<body><h1>Your form has been submitted through url(/submit-details).It is submit one... with url(/submit)  </h1></body>');
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

const server = http.createServer(requestListener);


const PORT = 3000;
server.listen(PORT, ()=>{
    console.log(`Server running on address http://localhost:${PORT}`);
});