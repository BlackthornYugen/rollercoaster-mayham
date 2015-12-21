/**
 * Created by jsteel on 15-07-18.
 */
var util = require("util"),
    io = require("socket.io")(),
    port = process.env.WEBSOCKET_PORT || 8000,
    players = [];

io.on('connection', onClientConnect);

function onClientConnect(client) {
    players.push(client);
    client.on("disconnect", onClientDisconnect);
    util.log("Player has connected: %s", this.id);

    var ns = io.of("/");
    for(x in ns.connected) {
        var player = ns.connected[x];
        if(player.id !== client.id) {
            var response = getPlayerHash(client.id);
            response.isNew = true;
            player.emit("newPlayer", response);
        }
    }
}

function onClientDisconnect(client) {
    util.log("Player has disconnected: %s", this.id)
};

io.listen(port);