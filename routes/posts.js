const fs = require('fs');

const router = require('express').Router();

const verifyToken = require('../verifyToken.js');

// Posts data from https://jsonplaceholder.typicode.com/posts
const posts = JSON.parse(
  fs.readFileSync(`${process.cwd()}/posts.json`, 'utf-8'),
);

router.get('/', verifyToken, (req, res) => res.send(posts));

module.exports = router;
