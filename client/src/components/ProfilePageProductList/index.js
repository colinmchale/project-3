import React from "react";
// Import `<Link>` component from React Router for internal hyperlinks
import { Link } from "react-router-dom";

const ProductList = ({ products }) => {
  if (!products.length) {

    return <><h8>No listings to show yet!</h8><br></br><h7>------------------------------------------------------------------------------</h7></>
  }
  return (
    <div>
      {products &&
        products.map((product) => (
        <div className="row" key={product._id}>
           <div className="col s12 m7">
              <div className="card">
               <div className="card-image">
                  <img src={`images/${product.image}`} alt='screenshot'/>
                </div>
                <div className="card-content">
                  <span className="card-title">{product.name}</span>
                <p>{product.description}</p>
                <p>Starting Bid: ${product.starting_price}</p>
                <p>Current High Bid: ${product.current_price}</p>
                </div>
                <div className="card-action">
                <Link
                      className="btn btn-primary btn-block btn-squared"
                      to={`/products/${product._id}`}
                    >Check Me Out!</Link>
                </div>
              </div>
           </div>
        </div>
         ), 
         </div>
  );
};

export default ProductList;
