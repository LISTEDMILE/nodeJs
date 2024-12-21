
const http = require('http');

function requestListener(req,res){

    // if need only some part of the req
    // url is url after / of host mehods is what is wanted in req,  header is the values send like this:that that is header here
    console.log(req.url,req.method,req.headers);

    if(req.url === '/'){
    // setHeader is used to define which type of data we are sharing
    res.setHeader('Content-Type','text/html');
    // isko ek line me bhi likh skte h multiple line string bhi bhej skte h etc etc....
    res.write('<html>');
    res.write('<head><title>Complete Coding </title></head>');
    res.write('<body><h1>HI This is home page with url (/) </h1></body>');
    res.write('</html>');

    // to end res we use ___  res.end()   ____ directly but if we want ki terminal uske bad bhi chalta rhe kyoki agar ek bar end hua to dobara setHeader nhi kar skte to direct end karne ke bjae is case me hm res.end ko return   ___res.end()___   likhenge.... but last me to end hoga hi to last me kar skte h
    
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