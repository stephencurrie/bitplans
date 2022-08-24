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
    foods: [Food]!
  }

  type Food {
    _id: ID
    foodText: String
    foodAuthor: String
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
    addFood(
      cityId: ID!
      foodText: String!
      foodAuthor: String!
    ): City
    removeCity(cityId: ID!): City
    removeFood(cityId: ID!, foodId: ID!): City
  }
`;

module.exports = typeDefs;
