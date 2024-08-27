const rateLimits = {};

const rateLimiter = (req, res, next) => {
  const userId = req.body.user_id;
  const currentTime = Date.now();
  const timeWindow = 60000; // 1 minute
  const maxRequestsPerMinute = 20;

  if (!rateLimits[userId]) {
    rateLimits[userId] = [];
  }

  rateLimits[userId] = rateLimits[userId].filter(timestamp => currentTime - timestamp < timeWindow);

  if (rateLimits[userId].length >= maxRequestsPerMinute) {
    return res.status(429).send('Rate limit exceeded');
  }

  rateLimits[userId].push(currentTime);

  next();
};

module.exports = rateLimiter;
