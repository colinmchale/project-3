import React from "react";
// Import `<Link>` component from React Router for internal hyperlinks
import { Link } from "react-router-dom";




const OrderList = ({ products }) => {
  if (!products.length) {
    return <h7>You have not made any purchases yet!</h7>;
  }
  console.log(products[0]);
  return (
    <div>
        <h7>My Orders</h7>
      {
        // products &&
        products
          .map((product) => (
            <div className="row" key={product.product._id}>
              <div className="col s12 m7">
                <div className="card">
                  <div className="card-image">
                    <img src={`images/${product.product.image}`} alt="screenshot" />
                  </div>
                  <div className="card-content">
                    <span className="card-title center">{product.product.name}</span>
                    <p className="center">{product.product.description}</p>
                  </div>
                  <div>Selling Price: ${product.price}</div>
                  <div className="card-action">
                    {/* <button onClick={launchStripe}
                      className="btn btn-primary btn-block btn-squared"
                      to={`/products/${product.product._id}`}
                    >
                      Pay Now!
                    </button> */}
                    <Link
                      className="btn btn-primary btn-block btn-squared"
                      to={`/products/${product.product._id}`}
                    >
                      Pay Now!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
      }
    </div>
  );
};

export default OrderList;