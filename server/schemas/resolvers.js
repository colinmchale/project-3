const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Order, Bid, Category } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const ObjectId = require('mongodb').ObjectID;

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    bids: async (parent, {product}) => {
      return await Bid.find({product: product}).populate('user').populate('product');
    },
    userBids: async (parent, {user}) => {
      return await Bid.find({user: ObjectId(user)}).populate('user').populate('product');
    },
    products: async (parent, { category }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      // if (name) {
      //   params.name = {
      //     $regex: name
      //   };
      // }

      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    users: async () => {
      return await User.find().populate('listings');
    },
    user: async (parent, { _id }, context) => {
      // if (context.user) {
        const user = await User.findById(_id).populate('listings');

        return user;
      // }

      // throw new AuthenticationError('Not logged in');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('listings');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    orders: async (parent, { product }) => {
      return await Order.findOne({product: ObjectId(product)}).populate('buyer').populate('seller').populate('product');
    },
    order: async (parent, { _id }, context) => {
      // if (context.user) {
        const order = await Order.findById(_id).populate('seller').populate('buyer').populate('product');
      
        // console.log(order.user.firstName);

        return order; 

      // }

      // throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate('products').execPopulate();

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    },
    userBids: async (parent, { user }) => {
      return await Bid.find({user: ObjectId(user)}).populate('user').populate('seller').populate('product');
    },
    bids: async (parent, { product }) => {
      return await Bid.find({product: ObjectId(product)}).populate('user').populate('seller').populate('product');
    },
    bid: async (parent, { _id }) => {
      return await Bid.findById(_id).populate('user').populate('product');
    } 
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
  
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
  
      const correctPw = await user.isCorrectPassword(password);
  
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
  
      const token = signToken(user);
  
      return { token, user };
    },
    // addOrder: async( parent, args, context) => {
    //   console.log('add order')
    //   const order = await Order.create({...args})
    //   return order;
    // },
    addUser: async (parent, args) => {
        try {
        console.log('add user resolver')
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    } catch(err){
        console.log(err)
        throw new AuthenticationError('couldnt add user');
    }
    },
    addBid: async( parent, { product, price }, context) => {
      console.log('trying to find seller')
      const seller = await User.findOne({listings: ObjectId(product)})
      console.log(seller)
      
      const bid = await Bid.create({
        user: context.user._id,
        seller: seller,
        product: product,
        price: price,
      })

      return bid
    },
    addProduct: async (parent, { name, description, starting_price, category }, context) => {
      // console.log(context);
      // if (context.user) {
        
        const newProduct = await Product.create({
          name,
          description,
          starting_price,
          // current_price,
          category
        });
        console.log(newProduct);
        await User.findByIdAndUpdate(context.user._id, { $push: { listings: newProduct } });

        return newProduct;
      // }

      // throw new AuthenticationError('Not logged in');
    },
    updateProductPrice: async (parent, { _id, current_price }, context) => {
       
      return await Product.findByIdAndUpdate(_id, { current_price: current_price });
    },
    removeProduct: async (parent, { productId }) => {
      return await Product.findOneAndDelete({ _id: productId });
    },
    addOrder: async (parent, { product }, context) => {
    //   // console.log(context);
    //   // if (context.user) {
       
      const bid = await Bid.findOne({product: ObjectId(product)}, null, { sort: { price: -1 }, limit: 1 }).populate('user').populate('seller').populate('product');
      console.log('this is the high bid')
      console.log(bid)
      const order = await Order.create({ 
        buyer: bid.user,
        seller: bid.seller,
        product: bid.product,
        price: bid.price
      });

      return order;

      // }
    }
  }
};

module.exports = resolvers;