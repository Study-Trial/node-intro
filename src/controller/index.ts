import http from 'node:http';
const server = http.createServer();
const port = 3500;
server.listen(port, () => console.log('listening on port ' + port));
server.on("request", async (req, res) => {
  res.statusCode = 200;
  
  let data = "";
 for await (let chunk of req) {
    data += chunk;
 }
 res.end(data);
  
})
