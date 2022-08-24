const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    cities: [City]!
  }

  type City {
    _id: ID
    cityText: String
    cityAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    cities(username: String): [City]
    city(cityId: ID!): City
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addCity(cityText: String!, cityAuthor: String!): City
    addComment(
      cityId: ID!
      commentText: String!
      commentAuthor: String!
    ): City
    removeCity(cityId: ID!): City
    removeComment(cityId: ID!, commentId: ID!): City
  }
`;

module.exports = typeDefs;
