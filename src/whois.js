const net = require("net");

const utils = require("./utils");
const db = require("./database");

const server = net.createServer((c) => {
  c.on("data", async (data) => {
    const query = data.toString("utf8").trim();

    /**
     * IPv4 Block查询
     */
    if (utils.isRoute(query)) {
      const route = utils.getRoute(query);
      const res = db.getRouteObject(route);
      if (!res) {
        console.log(`[Warning: Not Found] Query route ${route}`);
        c.end(`${route} NOT Found\n`);
        return;
      }
      const text = utils.format(res);
      console.log(`[Success] Query route ${route}`);
      c.end(text);
      return;
    }

    /**
     * IPv6 Block查询
     */
    if (utils.isRoute6(query)) {
      const route6 = utils.getRoute6(query);
      const res = db.getRoute6Object(route6);
      if (!res) {
        console.log(`[Warning: Not Found] Query route6 ${route6}`);
        c.end(`${route6} NOT Found\n`);
        return;
      }
      const text = utils.format(res);
      console.log(`[Success] Query route6 ${route6}`);
      c.end(text);
      return;
    }

    /**
     * AS对象查询
     */
    if (utils.isASN(query)) {
      const asn = utils.getASN(query);
      const res = db.getASObject(asn);
      if (!res) {
        console.log(`[Warning: Not Found] Query aut-num ${asn}`);
        c.end(`${asn} NOT Found\n`);
        return;
      }
      const text = utils.format(res);
      console.log(`[Success] Query aut-num ${asn}`);
      c.end(text);
      return;
    }

    /**
     * AS-SET对象查询
     */
    if (utils.isASSET(query)) {
      const asset = utils.getASSET(query);
      const res = db.getASSETObject(asset);
      if (!res) {
        console.log(`[Warning: Not Found] Query as-set ${asset}`);
        c.end(`${asset} NOT Found\n`);
        return;
      }
      const text = utils.format(res);
      console.log(`[Success] Query as-set ${asset}`);
      c.end(text);
      return;
    }

    /**
     * 维护者查询
     */
    if (utils.isMAINT(query)) {
      const mntner = utils.getMAINT(query);
      const res = db.getMAINTObject(mntner);
      if (!res) {
        console.log(`[Warning: Not Found] Query mntner ${mntner}`);
        c.end(`${mntner} NOT Found\n`);
        return;
      }
      const text = utils.format(res);
      console.log(`[Success] Query mntner ${mntner}`);
      c.end(text);
      return;
    }

    c.end(`Unsupport Object\n`);
  });
});

module.exports = server;
