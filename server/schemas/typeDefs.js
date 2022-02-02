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
    date_created: Date
    expiration_time: Date
    starting_price: Float
    current_price: Float
    bid: [Bid]
    category: [Category]
  }


//////
  type Order {
    _id: ID
    buyer_id: [User]
    seller_id: [User]
    orderDate: String
    product_id: [Product]
    price: Float
  }


  type Bid {
    _id: ID
    user_id: [User]
    product_id: [Product]
  }
//////



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
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth







  }
`;

module.exports = typeDefs;