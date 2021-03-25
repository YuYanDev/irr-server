const whois = require("./src/whois");
const ftp = require("./src/ftp");
const writeDB = require("./src/file");

whois.listen(43);
ftp.listen();

writeDB();
