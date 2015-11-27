var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
var PORT = process.env.PORT || 1337;
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

  rl.on('line', function(dt){
    socket.write(dt);
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
});


server.listen(PORT, '127.0.0.1');
console.log("Servidor TCP...");
