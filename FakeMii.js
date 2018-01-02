const http = require('http');
const fs   = require('fs');
const url  = require('url');

const hostname = process.env.HOSTNAME || '127.0.0.1';
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  console.log('serving: ' + req.url);
  if(req.url == "http://conntest.nintendowifi.net/")
    sendConnTestPage(res);
  else
  {
    send404(res);
  }
});

server.listen(port, hostname, () => {
  console.log('Server running on ' + hostname + ':' + port);
});

function sendConnTestPage(res) {
  res.writeHead(200, {
  'Content-Type'	: 'text/html',
  'connection'		: 'keep-alive',
  'Server'			: 'BigIP',
  'X-Organization'	: 'Nintendo'});
  fs.readFile('./conntest.html',function(err,data) {
    res.end(data);
  });
  console.log('served conntest.html');
}

function send404(res) {
  res.writeHead(404, {"Content-Type": "text/plain"});
  res.write("404 Not Found\n");
  res.end();
  console.log('served 404.')
}
