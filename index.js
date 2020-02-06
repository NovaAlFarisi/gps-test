const Gt06 = require('gt06');
const net = require('net');
var serverPort = 4711;
var server = net.createServer((client) => {
  var gt06 = new Gt06();
  console.log('client connected');

  client.on('data', (data) => {
    try {
      gt06.parse(data);
    }
    catch (e) {
      console.log('err', e);
      return;
    }

    if (gt06.expectsResponse) {
      client.write(gt06.responseMsg);
    }

    gt06.msgBuffer.forEach(msg => {
      console.log("==========response=========");
      console.log(msg);
      if(msg.event.number == 18){
        console.log(`lat: ${msg.lat} // lon ${msg.lon}`);
        console.log(`google maps: https://www.google.com/maps?q=${msg.lat},${msg.lon}`)
      }
      console.log("==========response=========");
    });

    gt06.clearMsgBuffer();
  });
});

server.listen(serverPort, () => {
  console.log('started server on port:', 4711);
});
