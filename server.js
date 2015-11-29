var net = require('net');
//var sys = require('sys');
var count = 0;
var port = process.env.PORT || 1337;
var host = '54.235.132.133'; // heroku-app-name when deployed
var server_host = "tcpserver123.herokuapp.com"; 
var server = net.createServer(function (socket) { 

  // sys.puts("Connection from " + socket.remoteAddress);
   socket.write("Hello Dude!\n");
   socket.addListener("data", function (data) {
          // do stuff with (data) from client here 
          console.log(data.toString());
     });
     
     socket.on('close', function (error) {
        console.log('Error: ' + error);
        count--;
    });
   });

server.listen(port);

    console.log('server listening on: ' + port +' host: '+host);


setInterval(function(){
  console.log("Escuchando..."+port );
},4000);
