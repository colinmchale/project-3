const db = require('./connection');
const { User, Product, Order, Bid, Category } = require('../models');

db.once('open', async () => {
    await Category.deleteMany();
    
    const categories = await Category.insertMany([
        { name: 'Food' },
        { name: 'Household Supplies' },
        { name: 'Electronics' },
        { name: 'Books' },
        { name: 'Toys' }
    ]);

    console.log('categories seeded');
    
    await Product.deleteMany();
    const products = await Product.insertMany([

        {
          name: 'Tin of Cookies',
          description:
          'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
          starting_price: 2.99,
          current_price: 3.99,
          image: 'cookie-tin.jpg',
          category: categories[0]._id,
          date_created: 2022-01-31,
          expiration_time: 2022-12-07,
        },
        {
          name: 'Tin of hotdogs',
          description:
          'honestly kinda gross',
          starting_price: 19.99,
          current_price: 45.99,
          image: 'cookie-tin.jpg',
          category: categories[0]._id,
          date_created: 2022-01-31,
          expiration_time: 2022-12-07,
        }
    ])

    console.log('products seeded');

    await User.deleteMany();

    const users = await User.insertMany([{
        firstName: 'Frank',
        lastName: 'Ocean',
        email: 'Frank@bestmail.com',
        password: 'password10',
        listing_ids: [products[0]._id]
    },
    {
        firstName: 'bobby',
        lastName: 'Hopkins',
        email: 'lilbob@bestmail.com',
        password: 'password10',
        listing_ids: [products[1]._id]
    }]);

    console.log('users seeded');

    await Bid.deleteMany();
    const bids = await Bid.insertMany([
        {
          id: 1,
          user_id: users[0]._id,
          product_id: products[0]._id
        },
        {
          id: 2,
          user_id: users[1]._id,
          product_id: products[1]._id
        },
    ])
    
 
    await Order.deleteMany();
    const orders = await Order.insertMany([
        {
          seller_id: users[0]._id,
          buyer_id: users[1]._id,
          product_id: products[0]._id,
          price: 3.99,
          order_date: 2022-12-07
        },
        {
          seller_id: users[1]._id,
          buyer_id: users[0]._id,
          product_id: products[0]._id,
          price: 45.99,
          order_date: 2022-12-07
        }
    ])

    console.log('orders seeded');

  process.exit();
});
