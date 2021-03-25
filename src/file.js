const fs = require("fs");
const zlib = require("zlib");


const writeDB = () => {
  const test = "test111111";
  const buf = Buffer.from(test, "utf-8");
  zlib.gzip(buf, (err, res) => {
    fs.writeFile("public/irr/yuyan.db.gz", res);
  });
};

module.exports = writeDB;
