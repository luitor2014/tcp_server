# Load the net module to create a tcp server.
net = require("net")

# Creates a new TCP server. The handler argument is automatically set as a listener for the 'connection' event
server = net.createServer((socket) ->
  
  # Every time someone connects, tell them hello and then close the connection.
  console.log "Connection from " + socket.remoteAddress
  socket.end "Hello World\n"
)
port = process.env.PORT
# Fire up the server bound to port 7000 on localhost
server.listen port

# Put a friendly message on the terminal
console.log "TCP server listening on port "+ port +" at localhost."
