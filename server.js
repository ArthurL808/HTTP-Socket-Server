"use strict";
const net = require("net");
const files = require("./files.js");

const PORT = 8080;

const server = net.createServer(socket => {
  socket.on("data", chunk => {
    // read incoming data
    console.log("data");
    console.log(chunk.toString());

    // parse the string
    var test = chunk.toString().split(" ");
    // grab the right file

    // write outgoing data
    if (test[1] === `/`) {
      socket.write(`HTTP/1.1 200 OK
Server: dope magic
Content-Type: text/html
Connection: keep-alive

${files.index}`);
    } else if (test[1] === `/index.html`){
      socket.write(`HTTP/1.1 200 OK
Server: dope magic
Content-Type: text/html
Connection: keep-alive

      ${files.index}`)
    }else if (test[1] === `/hydrogen.html`){
      socket.write(`HTTP/1.1 200 OK
Server: dope magic
Content-Type: text/html
Connection: keep-alive

      ${files.hydrogen}`)
    }else if (test[1] === `/helium.html`){
      socket.write(`HTTP/1.1 200 OK
Server: dope magic
Content-Type: text/html
Connection: keep-alive

      ${files.helium}`)
    }else if(test[1] === `/css/styles.css`){
      socket.write(`HTTP/1.1 200 OK
Server: dope magic
Content-Type: text/html
Connection: keep-alive

      ${files.styles}`)
    }else{
      socket.write(`HTTP/1.1 404 NOT FOUND
Server: dope magic
Content-Type: text/html
Connection: keep-alive

      ${files.notFound}`)
    }
    socket.end();
  });

  socket.on("end", () => {
    // handle client disconnect
    console.log(`The connection has disconnected`)
  });

  socket.on("error", err => {
    // handle error in connection
    console.log(`An error occurred`)
  });
});

server.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
