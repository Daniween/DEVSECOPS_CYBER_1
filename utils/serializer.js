const serialize = require('serialize-javascript');

function safeSerialize(obj) {
  return serialize(obj, { unsafe: false });
}

module.exports = { safeSerialize };
