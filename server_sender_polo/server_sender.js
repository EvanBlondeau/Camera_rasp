var httpAttach = require("http-attach"); // useful module for attaching middlewares
var HLSServer = require("hls-server");
var http = require("http");
var ip = require("ip");
var io = require("socket.io-client");

var myIP = ip.address();
var server = http.createServer();

console.log(`Lancement du serveur qui envoie un flux HLS sur le port 8000...`);

var hls = new HLSServer(server, {//server HLS pour streamer le flux 
  path: "/streams", // Base URI to output HLS streams
  dir: "public/videos" // Directory that input files are stored
});

var socket = io.connect(//te connecte au serveur principal pour communiquer etc.. on utilise ici de la web socket
  //penser à changer cette ligne en fonction de l'adresse du serveur
  "http://192.168.43.15:3000"
);

let response = {};
response.command = "send_ip";
response.ip = myIP;

// First emission
socket.emit("ip", response);

// For the reconnection
socket.on("reconnection", function(data) {
  console.log(data);
  switch (data.command) {
    case "sync":
      socket.emit("ip", response);
      break;
    default:
      console.log("Command not supported..");
  }
});

function yourMiddleware(req, res, next) {
  // set your headers here
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
}

httpAttach(server, yourMiddleware);
server.listen(8000);
