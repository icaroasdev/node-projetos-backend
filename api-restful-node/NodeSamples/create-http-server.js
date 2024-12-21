import { createServer } from 'node:http';

const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
});

server.listen(8080, 'localhost', () => {
    console.log('Server running at http://localhost:8080/');
});
