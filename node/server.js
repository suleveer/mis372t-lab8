// // Import the HTTP module
// const http = require('http');
// const url = require('url');
// const path = require('path');
// const fs = require('fs');

// // Create a server object
// const server = http.createServer((req, res) => {
// //   // Set the response HTTP header with HTTP status and Content type
// //   res.writeHead(200, { 'Content-Type': 'text/plain' });
// //   // Send the response body as 'Hello, World!'
// //   res.end('Hello, World!\n');

// const parsedUrl = url.parse(req.url, true);
// const pathName = parsedUrl.pathName;

// let filepath = path.join(__dirname, 'public', pathname === '/' ? 'index.html' : pathname + '.html');

// fs.readFile (filePath, (err,data) => {
//     if (err)
//     {
//         res.writeHead(404, {'Content-Type': 'text/html'});
//         res.write('<h1>404 error, resource not found</h1>');
//         res.end();
//     }
//     else {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.write(data);
//         res.end();
//     }
// });
    

// res.writeHead(200, {'Content-Type' : 'text/html'} );
// res.end(`<h1>You requested ${pathName} </h1>\n`)
// // res.end("<h1>Hello!</h1>");
// });

// // Define the port to listen on const PORT = 3000;
// const PORT = 3000;

// // Start the server and listen on the specified port
// server.listen(PORT, 'localhost', () => {
//   console.log(`Server running at http://localhost:${PORT}/`);
// });

const http = require('http');
 const url = require('url');
 const fs = require('fs');
 const path = require('path');
  
 const server = http.createServer((req, res) => {
   const parsedUrl = url.parse(req.url, true);
   const pathname = parsedUrl.pathname;

   let filePath = path.join(__dirname, 'public', pathname === '/' ? 'index.html' : pathname + '.html');

   fs.readFile(filePath, (err, data) => {
     if (err) {
       res.writeHead(404, { 'Content-Type': 'text/html' });
       res.write('<h1>404 Not Found</h1>');
       res.end();
     } else {
       res.writeHead(200, { 'Content-Type': 'text/html' });
       res.write(data);
       res.end();
     }
   });
 });  

 const PORT = 5000;
 server.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
 });
