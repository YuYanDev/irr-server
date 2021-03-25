const whoisServer = require("./src/whois");
const ftpServer = require("./src/ftp");
const fileService = require("./src/file");
const httpServer = require("./src/http");

whoisServer.listen(43);
ftpServer.listen();
httpServer.listen(8080)
fileService.exportFileJob();
