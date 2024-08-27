const express = require('express');
const { task } = require('./taskController');
const { addToQueue } = require('./taskQueue');
const rateLimiter = require('./rateLimiter');

const router = express.Router();

router.post('/task', rateLimiter, (req, res) => {
  const userId = req.body.user_id;
  addToQueue(userId, () => task(userId));
  res.status(202).send('Task received and queued');
});

module.exports = router;
