var net = require('net');
var sys = require('sys');

var port = process.env.PORT || 3000;
var host = 'tcpserver123.herokuapp.com'; // heroku-app-name when deployed

var server = net.createServer(function (socket) { 

   sys.puts("Connection from " + socket.remoteAddress);
   socket.write("Hello Dude!\n");
   socket.addListener("data", function (data) {
          // do stuff with (data) from client here 
          console.log(data);
     });
   });

server.listen(port, host);

    console.log('\033[90m   server listening on *:' + port + '\033[39m'+' host:'+host);


setInterval(function(){
  console.log("Escuchando...");
},4000);
