
const http = require('http');

// import from user to any const....
const requestListener = require('./user')
const server = http.createServer(requestListener);


const PORT = 3000;
server.listen(PORT, ()=>{
    console.log(`Server running on address http://localhost:${PORT}`);
});