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
        listings: [products[0], products[1]]
    },
    {
        firstName: 'bobby',
        lastName: 'Hopkins',
        email: 'lilbob@bestmail.com',
        password: 'password10',
        listings: [products[1]]
    }]);

    console.log('users seeded');

    await Bid.deleteMany();
    const bids = await Bid.insertMany([
        {
          user: users[0],
          product: products[0]
        },
        {
          user: users[1],
          product: products[1]
        },
    ])
    
 
    await Order.deleteMany();
    const orders = await Order.insertMany([
        {
          seller: users[0],
          buyer: users[1],
          product: products[0],
          price: 3.99,
          order_date: 2022-12-07
        },
        {
          seller: users[1],
          buyer: users[0],
          product: products[0],
          price: 45.99,
          order_date: 2022-12-07
        }
    ])
    // console.log(orders);
    console.log('orders seeded');

  process.exit();
});
