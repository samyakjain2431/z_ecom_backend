# Node.js Task Queue with Rate Limiting

This project is a Node.js API that manages user tasks with rate limiting and queuing. It uses Redis for queue management and is designed to handle tasks efficiently without dropping any requests.

## Features
- Rate limiting per user: 1 task per second, 20 tasks per minute.
- Task queuing to ensure no request is lost.
- Clustering for scalability.
- Logging of task completion.

## Prerequisites
- Node.js
- Redis

## Installation
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up your environment variables in `.env`.
4. Start the Redis server.
5. Run the server with `node src/server.js`.

## API Endpoints
- **POST /api/task**
  - Body: `{ "user_id": "123" }`
  - Adds a task to the queue and processes it according to the rate limit.

## How It Works
- The rate limiter ensures that no user can exceed the defined task limits.
- If a user exceeds the limit, their requests are queued and processed later.
- Task details are logged to `logs/task.log`.
