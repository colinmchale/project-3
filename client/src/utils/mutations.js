import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_BID = gql`
mutation addBid(
   $product_id: ID!
   $price: Float!){
   addBid(
   product_id: $product_id
   price: $price
   ){
   price
   }
   }`
   ;

   export const ADD_PRODUCT = gql`
   mutation addProduct(
   $name: String!
   $description: String!
   $image: String!
   $starting_price: Number!
   $category: String!){
   addProduct(
   name: $name
   description: $description
   image: $image
   starting_price: $starting_price
   category: $category
   )
   }
   `



   export const UPDATE_PRODUCT_PRICE = gql`
   mutation updateProductPrice($_id: ID!, $current_price: Float!){
            updateProductPrice(_id: $_id, current_price: $current_price){
            current_price
            }
     }`;

// export const ADD_ORDER = gql`
//   mutation addOrder($products: ID!, $user: ID!, $buyer_id: ID!, $seller_id: ID!, $price: Number) {
//     addOrder(products: $products, user: $user, buyer_id: $buyer_id, seller_id: $seller, ) {
// `;


