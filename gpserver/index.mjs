// index.mjs
import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import {buildSchema, execute, subscribe} from 'graphql';
import {PubSub} from 'graphql-subscriptions';
import {useServer} from 'graphql-ws/lib/use/ws';
import {createServer} from 'http';
import {v4 as uuidv4} from 'uuid';
import {WebSocketServer} from 'ws';

// Fake in-memory database
let products = [
  {id: '1', name: 'Banana', price: 25},
  {id: '2', name: 'Apple', price: 30},
  {id: '3', name: 'Coconut', price: 22},
];

const pubsub = new PubSub();

const schema = buildSchema(`
  type Product {
    id: ID!
    name: String!
    price: Int!
  }

  type Query {
    products: [Product!]!
  }

  type Mutation {
    addProduct(name: String!, price: Int!): Product
  }

  type Subscription {
    productAdded: Product!
  }
`);

// Root resolver
const root = {
  products: () => products,
  addProduct: ({name, price}) => {
    const newProduct = {id: uuidv4(), name, price};
    products.push(newProduct);
    pubsub.publish('PRODUCT_ADDED', {productAdded: newProduct});
    return newProduct;
  },
  productAdded: {
    subscribe: () => pubsub.asyncIterator(['PRODUCT_ADDED']),
  },
};

const app = express();
app.use(express.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: {
      subscriptionEndpoint: 'ws://localhost:4000/graphql',
    },
  }),
);

const server = createServer(app);

const wsServer = new WebSocketServer({
  server,
  path: '/graphql',
});

useServer({schema, execute, subscribe, rootValue: root}, wsServer);

server.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
  console.log('Subscriptions are available at ws://localhost:4000/graphql');
});
