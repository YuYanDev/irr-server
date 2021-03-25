const Koa = require("koa");
const fs = require("fs");
const app = new Koa();
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const serve = require("koa-static");
const mount = require("koa-mount");
const utils = require("../utils");

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

app.use(mount("/public", serve("public")));
app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
