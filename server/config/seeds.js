const db = require('./connection');
const { User, Product, Order, Bid } = require('../models');

db.once('open', async () => {
    await Category.deleteMany();

    const categories = await Category.insertMany([
      { name: 'Food' },
      { name: 'Household Supplies' },
      { name: 'Electronics' },
      { name: 'Books' },
      { name: 'Toys' }
    ]);


    await User.deleteMany();

    await User.create({
        firstName: 'Frank',
        lastName: 'Ocean',
        email: 'Frank@bestmail.com',
        password: 'password10',
        bid_ids: [1, 2, 3],
        listing_ids: [1, 2, 3],
        order: [1, 2, 3]
    });

    await User.create({
        firstName: 'bobby',
        lastName: 'Hopkins',
        email: 'lilbob@bestmail.com',
        password: 'password10',
        bid_ids: [4, 5, 6],
        listing_ids: [4, 5, 6],
        order: [4, 5, 6]
    });

    console.log('users seeded');

    await Product.deleteMany();
    const products = await Product.insertMany([

        {
          name: 'Tin of Cookies',
          description:
          'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
          starting_price: 2.99,
          current_price: 3.99,
          bid: [1,4],
          image: 'cookie-tin.jpg',
          category: categories[0]._id,
          date_created: 2022-01-31,
          expiration_date: 2022-12-07,
        },
        {
          name: 'Tin of hotdogs',
          description:
          'honestly kinda gross',
          starting_price: 19.99,
          current_price: 45.99,
          bid: [2,5],
          image: 'cookie-tin.jpg',
          category: categories[0]._id,
          date_created: 2022-01-31,
          expiration_date: 2022-12-07,
        }
    ])

    console.log('products seeded');
    
    
    await Order.deleteMany();
    const order = await Order.insertMany([
        {
          seller_id: 1,
          buyer_id: 2,
          product_id: 1,
          price: 3.99,
          order_date: 2022-12-07
        },
        {
          seller_id: 2,
          buyer_id: 1,
          product_id: 2,
          price: 45.99,
          order_date: 2022-12-07
        }

    ])

    console.log('orders seeded');
    
    
    await Bid.deleteMany();
    const bid = await Bid.insertMany([
        {
          id: 1,
          user_id: 1,
          product_id: 2
        },
        {
          id: 2,
          user_id: 1,
          product_id: 2
        },
    ])

    console.log('orders seeded');


  process.exit();
});
