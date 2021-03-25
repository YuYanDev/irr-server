const FtpSrv = require("ftp-srv");

const ftpServer = new FtpSrv({ pasv_url: "/irr" });

ftpServer.on("login", (data, resolve, reject) => {
  resolve({ root: "./public" });
});

module.exports = ftpServer;
