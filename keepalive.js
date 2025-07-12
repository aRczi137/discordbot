const express = require("express");
const server = express();

server.all("/", (req, res) => {
  res.send("Bot działa!");
});

function keepAlive() {
  server.listen(3000, () => {
    console.log("✅ KeepAlive działa");
  });
}

module.exports = keepAlive;
