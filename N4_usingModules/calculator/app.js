const http = require('http');
const handler = require('./handler')
const server = http.createServer(handler);

const PORT = 3001;
server.listen(PORT,() => {
    console.log(`Server running at ${PORT}`);
});