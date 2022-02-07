import React from 'react';
// Import `<Link>` component from React Router for internal hyperlinks
import { Link } from 'react-router-dom';

const MyBids = ( {myBids} ) => {
  if (!myBids.length) {

    return <h3>No bids yet... well.. whaterya waitin for?! </h3>;
  }
  // console.log(products[0])
  return (
    <div>


      {
      // products &&
      myBids.filter((bid) => bid.product.expiration_time > Date.now()).map((bid) => ( 
<div className="row" key={bid.product._id}>
    <div className="col s12 m7">
      <div className="card">
        <div className="card-image">
          <img src={`images/${bid.product.image}`} alt='screenshot'/>
          <span className="card-title">{bid.product.name}</span>
        </div>
        <div className="card-content">
        <p>{bid.product.description}</p>
        <p>Current High Bid: ${bid.product.current_price}</p>
        <p>My Current Bid: ${bid.price}</p>
        </div>
        <div className="card-action">
        <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/products/${bid.product._id}`}
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