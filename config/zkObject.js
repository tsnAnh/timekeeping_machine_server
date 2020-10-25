const Node_ZKobject = require("node-zklib/zklib");
const ZKobject = require("zklib");

const ip = "192.168.51.252";
const port = 4370;
const inport = 5200;

node_zk = new Node_ZKobject(ip, port, 10000, 4000);
zk = new ZKobject({ ip, port, inport });

module.exports = { node_zk, zk };
