const fs = require('fs');
const path = require('path');

const task = (userId) => {
  const timestamp = Date.now();
  const logMessage = `${userId} - task completed at - ${new Date(timestamp).toISOString()}\n`;
  fs.appendFileSync(path.join(__dirname, 'task.log'), logMessage);
  console.log(logMessage);
};

module.exports = { task };
