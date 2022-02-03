import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName

    }
  }
`;

export const QUERY_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      image
    }
  }
`;

export const QUERY_PRODUCT = gql`
  query getProduct($_id: ID!) {
    product(_id: $_id) {
      _id
      name
      description
      image
      date_created
      expiration_time
      starting_price
      current_price
      category {
        _id
      }
    }
  }
`;