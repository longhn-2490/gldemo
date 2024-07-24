// src/graphql/queries.ts
import {gql} from '@urql/core';

export const GET_USERS = gql`
  query {
    users {
      id
      name
      age
      birthdate
    }
  }
`;

export const ADD_USER = gql`
  mutation ($name: String!, $age: Int!, $birthdate: String!) {
    addUser(name: $name, age: $age, birthdate: $birthdate) {
      id
      name
      age
      birthdate
    }
  }
`;

export const USER_ADDED = gql`
  subscription {
    userAdded {
      id
      name
      age
      birthdate
    }
  }
`;
