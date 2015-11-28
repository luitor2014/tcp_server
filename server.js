var net = require('net');
//var sys = require('sys');

var port = process.env.PORT || 1337;
var host = '54.221.230.37'; // heroku-app-name when deployed

var server = net.createServer(function (socket) { 

  // sys.puts("Connection from " + socket.remoteAddress);
   socket.write("Hello Dude!\n");
   socket.addListener("data", function (data) {
          // do stuff with (data) from client here 
          console.log(data.toString());
     });
   });

server.listen(port,host);

    console.log('server listening on: ' + port +' host: '+host);


setInterval(function(){
  console.log("Escuchando...");
},4000);
