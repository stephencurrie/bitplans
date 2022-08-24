import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      cities {
        _id
        cityText
        createdAt
      }
    }
  }
`;

export const QUERY_CITIES = gql`
  query getCities {
    cities {
      _id
      cityText
      cityAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_CITY = gql`
  query getSingleCity($cityId: ID!) {
    city(cityId: $cityId) {
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
