const net = require('net');
var serverPort = 4711;
var server = net.createServer((client) => {
  console.log('client connected');

  client.on('data', (data) => {
    console.log(data.toString('utf8'));
  });
});

server.listen(serverPort, () => {
  console.log('started server on port:', 4711);
});
