const fs = require("fs");
const zlib = require("zlib");
const cron = require("node-cron");

const db = require("./database").db;
const config = require("../config");
const utils = require("./utils");

const getExportText = () => {
  const route = db.get("route").value();
  const route6 = db.get("route6").value();
  const asn = db.get("asn").value();
  const asset = db.get("asset").value();
  const mntner = db.get("mntner").value();

  const total = []
    .concat(route)
    .concat(route6)
    .concat(asn)
    .concat(asset)
    .concat(mntner);
  let str = "";
  total.forEach((item) => {
    str += utils.format(item) + "\n";
  });
  return str;
};

const exportFile = () => {
  const { dbName = "irr" } = config;
  const exportText = getExportText();
  const buf = Buffer.from(exportText, "utf-8");
  zlib.gzip(buf, (err, res) => {
    if (err) {
      console.log(`[Error] Export Realtime DB Gzip Fail. ${String(err)}`);
      return;
    }
    fs.writeFile(`public/irr/${dbName || "irr"}.db.gz`, res, (err) => {
      if (err) {
        console.log(
          `[Error] Export Realtime DB File System Fail. ${String(err)}`
        );
      } else {
        console.log(`[Info] Export Realtime DB`);
      }
    });
  });
};

const releaseFile = () => {
  const { dbName = "irr" } = config;
  const exportText = getExportText();
  const buf = Buffer.from(exportText, "utf-8");

  zlib.gzip(buf, (err, res) => {
    if (err) {
      console.log(`[Error]Export Daily Release DB Gzip Fail. ${String(err)}`);
      return;
    }
    fs.writeFile(
      `public/irr/${dbName || "irr"}-${utils.getTimeStamp()}.db.gz`,
      res,
      (err) => {
        if (err) {
          console.log(
            `[Error] Export Realtime DB File System Fail. ${String(err)}`
          );
        } else {
          console.log(`[Info] Export Daily Release DB`);
        }
      }
    );
  });
};

const exportFileJob = () => {
  exportFile();
  cron.schedule("*/5 * * * *", () => {
    exportFile();
  });
  cron.schedule("0 1 * * *", () => {
    releaseFile();
  });
};

module.exports = { exportFileJob };
