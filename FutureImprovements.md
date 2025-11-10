## **Problem with Private Chat**

- When a user is communicating with two or more other users in private chats, messages sometimes get mixed up. For example, if User A is chatting with User B and User C simultaneously, messages intended for User B may appear in the chat with User C and vice versa.

- This issue arises because the current implementation does not correctly isolate private chat sessions between different user pairs. The server needs to ensure that messages are routed only to the intended recipient based on the unique room created for each pair of users.

- We'v not implemented `Caching` yet to optimize performance and reduce database load. Implementing caching mechanisms (e.g., using Redis) can help store frequently accessed data, such as user sessions and recent messages, to improve response times.

- We've not implemented `Nginx` as a reverse proxy server to handle incoming requests, improve load balancing, and enhance security. Setting up Nginx can help manage traffic more efficiently and provide SSL termination for secure connections.

- We've not implemented `CRUD` for chat messages. Implementing Create, Read, Update, and Delete operations for chat messages will allow users to manage their conversations better, such as editing or deleting messages after they have been sent.
