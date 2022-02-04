const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Order, Bid, Category } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
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
    addBid: async( parent, args, context) => {
      console.log('add bid resolver')
      return await Bid.create({...args, user_id: context.user._id})
    },
    // updateUserListing: async (parent, { product }, context) => {
    //   // if (context.user) {
    //     const listings = 
    //     return await User.findByIdAndUpdate(context.user._id, { product }, { new: true });
      // }

      // throw new AuthenticationError('Not logged in');
    // },
    addProduct: async (parent, { name, description, image, starting_price, category }, context) => {
      // console.log(context);
      // if (context.user) {
        
        const newProduct = await Product.create({
          name,
          description,
          image,
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
      return Product.findOneAndDelete({ _id: productId });
    },
    addOrder: async (parent, { products }, context) => {
      // console.log(context);
      // if (context.user) {
        const order = new Order({ products });
      // }
    }
  }
};

module.exports = resolvers;