const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("data/db.json");
const db = low(adapter);

db.defaults({ route: [], route6: [], asn: [], asset: [], mntner: [] }).write();

const getRouteObject = (route) => db.get("route").find({ route }).value();
const getRoute6Object = (route6) => db.get("route6").find({ route6 }).value();
const getASObject = (asn) => db.get("asn").find({ "aut-num": asn }).value();
const getASSETObject = (asset) =>
  db.get("asset").find({ "as-set": asset }).value();
const getMAINTObject = (mntner) => db.get("mntner").find({ mntner }).value();

module.exports = {
  db,
  getRouteObject,
  getRoute6Object,
  getASObject,
  getASSETObject,
  getMAINTObject,
};
