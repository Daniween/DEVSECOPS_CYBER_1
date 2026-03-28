const express = require('express');
const router = express.Router();
const { safeSerialize } = require('../utils/serializer');

router.post('/render', (req, res) => {
  const name = req.body.name || 'alice';
  const template = req.body.template || '{name}';
  const html = template.replace(/{name}/g, name);
  res.send(html);
});

router.post('/serialize', (req, res) => {
  const payload = req.body;
  const s = safeSerialize(payload);
  res.send({ serialized: s });
});

module.exports = router;
