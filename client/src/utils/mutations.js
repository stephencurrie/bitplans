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
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $cityId: ID!
    $commentText: String!
    $commentAuthor: String!
  ) {
    addComment(
      cityId: $cityId
      commentText: $commentText
      commentAuthor: $commentAuthor
    ) {
      _id
      cityText
      cityAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
