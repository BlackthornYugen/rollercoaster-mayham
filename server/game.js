/**
 * Created by jsteel on 15-07-18.
 */
var util = require("util"),
    io = require("socket.io")(),
    port = process.env.PORT || process.env.WEBSOCKET_PORT || 8000;

var Player = require('./Player.js');
var match = new (require('./Match.js'))(io);

io.on('connection', onClientConnect);

function onClientConnect(client) {
    var player = new Player(client);
    player.match = match;
    match.addPlayer(player);
    client.on("disconnect", onClientDisconnect);
    util.log("%s connected", client.id);
}

function onClientDisconnect(client) {
    util.log("%s disconnected", this.id)
};


io.listen(port);
util.log("Hosted on port %s!", port);