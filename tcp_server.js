var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var PORT = process.env.PORT;
var net = require('net');

var clients = [];

var server = net.createServer(function(socket) {

  socket.name = socket.remoteAddress + ":" + socket.remotePort;
  clients.push(socket);
  //socket.write('Echo server\r\n');
  //socket.pipe(socket);
  socket.on('data', function (data) {
    console.log("Client: "+data.toString());
    //broadcast(socket.name + "> " + data, socket);
     socket.write(data.toString());
     
     //enviamos a todos los usuarios
     broadcast(data.toString(), socket);
  });

  // Send a message to all clients
  function broadcast(message, sender) {
    clients.forEach(function (client) {
    // Don't want to send it to sender
    if (client === sender) return;
      client.write(message);
    });
    // Log it to the server output too
    process.stdout.write(message)
  }
  rl.on('line', function(dt){
    socket.write(dt);
  });
});

server.listen(PORT,'127.0.0.1', function() {
    console.log('port: '+ PORT);
});
setInterval(function(){
  console.log("Escuchando...");
},4000);
var os = require('os');
var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
    ++alias;
  });
});
