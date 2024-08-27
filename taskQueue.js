const queues = {};

const addToQueue = (userId, taskFunction) => {
  if (!queues[userId]) {
    queues[userId] = [];
  }

  queues[userId].push(taskFunction);

  if (queues[userId].length === 1) {
    processQueue(userId);
  }
};

const processQueue = (userId) => {
  if (!queues[userId] || queues[userId].length === 0) return;

  const taskFunction = queues[userId][0];
  taskFunction();

  setTimeout(() => {
    queues[userId].shift();
    processQueue(userId);
  }, 1000); // 1 task per second
};

module.exports = { addToQueue };
