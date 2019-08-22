var express = require("express");
var app = express();
var http = require("http").createServer(app);

var path = require("path");
var io = require("socket.io")(http);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use("/", (req, res) => {
  res.render("index.html");
});

let messages = [];

io.on("connection", function(socket) {
  console.log(`User ${socket.id} connected.`);

  socket.emit("previousMessages", messages);

  socket.on("sendMessage", data => {
    // io.emit("chat message", msg);
    console.info(data);
    messages.push(data);
    socket.broadcast.emit("message", data);
    //io.emit("message", data);
  });

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
  console.info(socket);
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});

//TODO Adicionar mensagem quando o usuário entrar na sala "FUlano está digitando..."

//TODO Adicionar o efeito de "FUlano está digitando..."
