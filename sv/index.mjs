// // index.mjs
// import express from 'express';
// import { createServer } from 'http';
// import { WebSocketServer } from 'ws';
// import { useServer } from 'graphql-ws/lib/use/ws';
// import { buildSchema, execute, subscribe } from 'graphql';
// import { v4 as uuidv4 } from 'uuid';
// import { PubSub } from 'graphql-subscriptions';
// import { graphqlHTTP } from 'express-graphql';

// // Fake in-memory database
// let users = [
//   { id: '1', name: 'John Doe', age: 25, birthdate: '1998-01-15' },
//   { id: '2', name: 'Jane Smith', age: 30, birthdate: '1993-02-20' },
//   { id: '3', name: 'Alice Johnson', age: 22, birthdate: '2001-03-05' },
// ];

// const pubsub = new PubSub();

// const schema = buildSchema(`
//   type User {
//     id: ID!
//     name: String!
//     age: Int!
//     birthdate: String!
//   }

//   type Query {
//     users: [User!]!
//   }

//   type Mutation {
//     addUser(name: String!, age: Int!, birthdate: String!): User
//   }

//   type Subscription {
//     userAdded: User!
//   }
// `);

// // Root resolver
// const root = {
//   users: () => users,
//   addUser: ({ name, age, birthdate }) => {
//     const newUser = { id: uuidv4(), name, age, birthdate };
//     users.push(newUser);
//     pubsub.publish('USER_ADDED', { userAdded: newUser });
//     return newUser;
//   },
//   userAdded: {
//     subscribe: () => pubsub.asyncIterator(['USER_ADDED']),
//   },
// };

// const app = express();
// app.use(express.json());

// app.use('/graphql', graphqlHTTP({
//   schema,
//   rootValue: root,
//   graphiql: {
//     subscriptionEndpoint: `ws://localhost:4000/graphql`,
//   },
// }));

// const server = createServer(app);

// const wsServer = new WebSocketServer({
//   server,
//   path: '/graphql',
// });

// useServer({ schema, execute, subscribe, rootValue: root }, wsServer);

// server.listen(4000, () => {
//   console.log('Running a GraphQL API server at http://localhost:4000/graphql');
//   console.log('Subscriptions are available at ws://localhost:4000/graphql');
// });
