

///in package.json type file jo niche dikh rhi hogi for that write npm init in the terminal and follow the commands it is the package of node to use node 
// in this json file there is script object jisme hm apni marji ka kuch dal skte h for ex. hmne isme (startHoja) me node app.js dala matlab jaise ab tak server start karne ke liye hm terminal me likhte the node app.js hm ab seedha startHoja likh skte h aise hi hm koi bhi command bna skte h.... but ya to start keyword use karenge ya syntax me run add hojaega for ex     npm run startHoja.....

// npm install then what we want to download we can wo apne aap sari dependencies wagarah dekh lega and man liya wo file maine kisi aur ko di to sare alag alag package install karne ki koi jarurat nhi  ek important file h pachage.json wo yhi sab save karke rakhti h ki kya kya dependencies aur kya kya h hme ab simply karna h npm install wo dekh lega kya kya use hua h us project me aur fir run kar skte h aur ha jab ham koi dependencies download karenge wo apne aap package.json ko update kar dega///......

// nodemon also used to run the server bur wo apne aap update hota rehta h bar bar terminal ko nhi chalana padta......

const http = require('http');


const server = http.createServer((req,res)=>{
    console.log("sdjf");
    res.write("<h1>djljs</h1>");
    res.end();
});


const PORT = 3000;
server.listen(PORT, ()=>{
    console.log(`Server running on address http://localhost:${PORT}`);
});