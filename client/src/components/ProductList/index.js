import React from "react";
// Import `<Link>` component from React Router for internal hyperlinks
import { Link } from "react-router-dom";


const ProductList = ({ products }) => {

  const styles = {
    width: "100%",
    height: "100%"
  }

  if (!products.length) {
    return <h7>No Listings Yet</h7>;
  }
  console.log(products[0]);
  return (
    <div>
      {
        // products &&
        products
          .filter((product) => product.expiration_time > Date.now())
          .map((product) => (
            <div className="row" key={product._id}>
              <div className="col s12 m7">
                <div className="card">
                  <div className="card-image">
                    <img src={`images/${product.image}`} alt="screenshot" style={styles}/>
                  </div>
                  <div className="card-content">
                    <span className="card-title center">{product.name}</span>
                    <p className="center">{product.description}</p>
                    <p className="center">Starting Price: ${product.starting_price}</p>
                    <p className="center">Current Price: ${product.current_price}</p>
                  </div>
                  <div className="card-action">
                    <Link
                      className="btn btn-primary btn-block btn-squared"
                      to={`/products/${product._id}`}
                    >
                      Check Me Out!
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

export default ProductList;
