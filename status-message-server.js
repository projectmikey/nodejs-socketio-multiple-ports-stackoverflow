const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

let port = 3000;

const fs = require('fs')
const data = fs.readFileSync('database/status-message.json', 'utf8')

io.on("connect", (socket) => {
  socket.emit("now", {
    message: data
  });
});

nextApp.prepare().then(() => {
  app.all("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log("> Ready on port: " + port);
  });
});