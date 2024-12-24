
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

        //req.on("data",(chunk)) matlab jab bhi data jae to chunk me jata h to jab jae tab kya iske through kar skte h
        req.on("data",(chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        //req.on("end",()=>) matlab req poore chli jae tab kya karna h....
        req.on("end",() => {
            //Buffer.concat(body).toString() ka matlab h ki jab chunks me data aata h buffer me aa jata h to data ko string me convert kiya fir poora concat karke buffer me gya aur fir fullBody me aa gya....
            /// Buffer ka matlab h jo bhi data aage piche ya kuch aur prob ho to usko perfectly arrange karne ke liye iska use hota h....
            const fullBody = Buffer.concat(body).toString();
            console.log(fullBody);

            // URLSearchParams jo concat hoke jate h na ek param ke form me usko firse alag usable bnane ke liye use hota h 
            const params = new URLSearchParams(fullBody);
            const bodyObject = {};

            // ye array of array ki form me data dega URLSearchParams to params me array of arrays ki form me data h ab ek loop ke through ek ek value dono se uthane lage aur ek object bosyObject me key value type me store kar denge now body object is a object which has keys and values try and check user.txt....
            //params.entries ka matlab whi param me jo entries...
            for (const [key,val] of params.entries()){
                bodyObject[key]=val;
            }


            /*

            isko aise bhi likh skte h 
            const bodyObject = Object.fromEntries(params);


            */


            const jsonstring = JSON.stringify(bodyObject);
            fs.appendFileSync('user.txt',jsonstring);
        });
        
        res.statusCode = 302;
        res.setHeader('Location','/submit');

        return res.end();
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

// modules.export used to export function or anything to other files...
/// for multiple write (module.exports = {.....})
module.exports = requestListener;


