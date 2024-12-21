// require is used to tell which modules we need and going to use in our server
// in function requestListener req is the req send by the user and res is send by the server we can use other name also here
//  server chalu to hua lekin usko read karne ke liye listen use kiya
// console.log me req h to agar browser pe host 3000 run kiya to console me request dikhne lgegi


const http = require('http');


// this is the larger method to define actual function to create a server but more  discriptive
function requestListener(req,res){
    console.log(req);
    process.exit();  /// console.log ke bad server band kardega
}

const server = http.createServer(requestListener);




// can also be created as this
/*
http.createServer((req,res)=>{
    console.log(req);
})
    */


// HM DIRECT 3000 port bhi de skte h 
// server.listen(3000)

const PORT = 3000;
server.listen(PORT, ()=>{
    console.log(`Server running on address http://localhost:${PORT}`);
});