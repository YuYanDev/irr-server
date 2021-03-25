const cidrRegex = require("cidr-regex");

const keyLength = 15;
const isArray = (unknow) =>
  Object.prototype.toString.call(unknow) === "[object Array]";

const isString = (unknow) =>
  Object.prototype.toString.call(unknow) === "[object String]";

const isRoute = (cidr = "") => {
  return cidrRegex.v4({ exact: true }).test(cidr);
};

const isRoute6 = (cidr6 = "") => {
  return cidrRegex.v6({ exact: true }).test(cidr6);
};

const getRoute = (cidr = "") => {
  const route = cidr.match(cidrRegex());
  if (route && Array.isArray(route) && route.length === 1) {
    return route[0].trim();
  }
};

const getRoute6 = (cidr6 = "") => {
  const route6 = cidr6.match(cidrRegex());
  if (route6 && Array.isArray(route6) && route6.length === 1) {
    return route6[0].trim();
  }
};

const isASN = (str = "") => {
  return !!str.match(/^AS[0-9]{1,}/);
};

const getASN = (str = "") => {
  if (isASN(str)) {
    return str.match(/^AS[0-9]{1,}/)[0];
  }
};

const isASSET = (str = "") => {
  return !!str.match(/^AS-[0-9a-zA-Z-]{1,}/);
};

const getASSET = (str = "") => {
  if (isASSET(str)) {
    return str.match(/^AS-[0-9a-zA-Z-]{1,}/)[0];
  }
};

const isMAINT = (str = "") => {
  return !!str.match(/^MAINT-[0-9a-zA-Z-]{1,}/);
};

const getMAINT = (str = "") => {
  if (isMAINT(str)) {
    return str.match(/^MAINT-[0-9a-zA-Z-]{1,}/)[0];
  }
};

const format = (obj) => {
  let str = "";
  Object.keys(obj).forEach((key) => {
    if (isArray(obj[key])) {
      obj[key].forEach((item) => {
        if (isString(item)) {
          str += `${`${key}:`.padEnd(keyLength)}${item}\n`;
        }
      });
    }
    if (isString(obj[key])) {
      str += `${`${key}:`.padEnd(keyLength)}${obj[key]}\n`;
    }
  });
  return str;
};

const getTimeStamp = () => {
  const date = new Date();

  let nowMonth = date.getMonth() + 1;

  let strDate = date.getDate();

  if (nowMonth >= 1 && nowMonth <= 9) {
    nowMonth = "0" + nowMonth;
  }

  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }

  return String(date.getFullYear() + nowMonth + strDate);
};

module.exports = {
  isRoute,
  isRoute6,
  format,
  getRoute,
  getRoute6,
  isASN,
  getASN,
  isASSET,
  getASSET,
  isMAINT,
  getMAINT,
  getTimeStamp,
};
