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
    category: Category
  }

  type Order {
    _id: ID
    buyer: User
    seller: User
    order_date: String
    product: Product
    price: Float
  }

  type Bid {
    _id: ID
    price: Int
    user: User
    product: Product
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    listings: [Product]
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
    user(_id: ID!): User
    me: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    bids: [Bid]
    bid(_id: ID!): Bid
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addProduct(name:String!, description: String!, image: String, starting_price: Float!, current_price:Float, date_created:String, expiration_time:String, category:ID!): Product
    updateUserListing(user:ID!, product:ID!): User
    updateProductPrice(_id: ID!, current_price: Float!): Product
    removeProduct(_id: ID!, expiration_time: String!): Product
    addBid(product_id:ID!, price:Float!): Bid
    updateBid(_id: ID!): Bid
    addOrder(products: [ID]!): Order
  }
`;

module.exports = typeDefs;