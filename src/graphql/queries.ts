// src/graphql/queries.ts
import {gql} from '@urql/core';

export const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation ($name: String!, $price: Int!) {
    addProduct(name: $name, price: $price) {
      id
      name
    }
  }
`;
