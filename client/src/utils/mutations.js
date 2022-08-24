import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CITY = gql`
  mutation addCity($cityText: String!, $cityAuthor: String!) {
    addCity(cityText: $cityText, cityAuthor: $cityAuthor) {
      _id
      cityText
      cityAuthor
      createdAt
      foods {
        _id
        foodText
      }
    }
  }
`;

export const ADD_FOOD = gql`
  mutation addFood(
    $cityId: ID!
    $foodText: String!
    $foodAuthor: String!
  ) {
    addFood(
      cityId: $cityId
      foodText: $foodText
      foodAuthor: $foodAuthor
    ) {
      _id
      cityText
      cityAuthor
      createdAt
      foods {
        _id
        foodText
        createdAt
      }
    }
  }
`;
