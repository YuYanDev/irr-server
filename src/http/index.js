const Koa = require("koa");
const fs = require("fs");
const app = new Koa();
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const serve = require("koa-static");
const mount = require("koa-mount");
const utils = require("../utils");
const db = require("../database");

const router = new Router();
app.use(bodyParser());

router.get("/", (ctx) => {
  ctx.body = "1111";
});

router.get("/public", (ctx) => {
  const fileList = fs.readdirSync("public");
  ctx.body = `<html><body><hr/>${fileList
    .map((e) => `<p><a href="/public/${e}">${e}</a></p>`)
    .join("")}<hr/><p>${utils.getTimeStamp()}, Total ${
    fileList.length
  } files </p></body></html>`;
});

router.get("/public/irr", (ctx) => {
  const fileList = fs.readdirSync("public/irr");
  ctx.body = `<html><body><hr/>${fileList
    .map((e) => `<p><a href="/public/irr/${e}">${e}</a></p>`)
    .join("")}<hr/><p>${utils.getTimeStamp()}, Total ${
    fileList.length
  } files </p></body></html>`;
});

router.post("/api/update", (ctx) => {
  const data = ctx.request.body;
  const mnt_by = data["mnt-by"];
  const password = data["password"];

  if (!mnt_by) {
    ctx.body = { code: 403, success: false, msg: "no maintainer" };
    return;
  }

  const mntner = db.getMAINTObject(mnt_by);
  if (!mntner) {
    ctx.body = { code: 403, success: false, msg: "maintainer not found" };
    return;
  }

  if (!(mntner["auth"] && mntner["auth"] === `PASSWORD ${password}`)) {
    ctx.body = { code: 403, success: false, msg: "maintainer check fail" };
    return;
  }

  const aut_num = data["aut-num"];
  if (aut_num) {
    // ToDo: AS Object
    ctx.body = { code: 200, success: true };
    return;
  }

  const as_set = data["as-set"];
  if (as_set) {
    // ToDo: AS-SET Object
    ctx.body = { code: 200, success: true };
    return;
  }

  const route = data["route"];
  if (route) {
    // ToDo: route Object
    ctx.body = { code: 200, success: true };
    return;
  }
  
  const route6 = data["route6"];
  if (route6) {
    // ToDo: route6 Object
    ctx.body = { code: 200, success: true };
    return;
  }

  const mntner = data["mntner"];
  if (mntner) {
    // ToDo: mntner Object
    ctx.body = { code: 200, success: true };
    return;
  }

  ctx.body = { code: 200, success: true };
});

app.use(mount("/public", serve("public")));
app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
