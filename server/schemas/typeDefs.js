const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    date_created: String
    expiration_time: String
    starting_price: Float
    current_price: Float
    bid: [Bid]
    category: [Category]
  }

  type Order {
    _id: ID
    buyer_id: [User]
    seller_id: [User]
    order_date: String
    product_id: [Product]
    price: Float
  }

  type Bid {
    _id: ID
    user_id: [User]
    product_id: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    bids: [Product]
    bid(_id: ID!): Bid
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    addProduct(name: String!, description: String!, image: String!, date_created: String): Product
    updateProductPrice(_id: ID!, current_price: Float!): Product
    removeProduct(_id: ID!, expiration_time: String!): Product
    addBid(user_id:ID!, product_id:ID!): Bid
    updateBid(_id: ID!): Bid
    addOrder(products: [ID]!): Order
  }
`;

module.exports = typeDefs;