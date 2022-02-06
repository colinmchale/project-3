import React from 'react';
// Import `<Link>` component from React Router for internal hyperlinks
import { Link } from 'react-router-dom';

const MyBids = ( {products} ) => {
  if (!products.length) {

    return <h3>No bids yet... well.. whaterya waitin for?! </h3>;
  }
  console.log(products[0])
  return (
    <div>


      {
      // products &&
        products.filter((product) => product.expiration_time > Date.now()).map((product) => ( 
<div className="row" key={product._id}>
    <div className="col s12 m7">
      <div className="card">
        <div className="card-image">
          <img src={`images/${product.image}`} alt='screenshot'/>
          <span className="card-title">{product.name}</span>
        </div>
        <div className="card-content">
        <p>{product.description}</p>
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
            ))
            }
  </div>




  );
  
};

export default MyBids;