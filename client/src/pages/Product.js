import React from "react";
import { useState } from "react";
// Import the `useParams()` hook from React Router
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import BidForm from "../components/BidForm";

// import CommentList from '../components/CommentList';
// import CommentForm from '../components/CommentForm';

import { QUERY_PRODUCT } from "../utils/queries";

const SingleProduct = () => {
  // let expiration_time = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
  // timeDisplayEl.text(expiration_time);

  const [toggle, setToggle] = useState(true);
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { productId } = useParams();

  const { loading, data } = useQuery(QUERY_PRODUCT, {
    // Pass the `thoughtId` URL parameter into query to retrieve this thought's data
    variables: { _id: productId },
  });

  const product = data?.product || {};
  console.log(product);
  console.log( parseInt(product.expiration_time))
  console.log(new Date(parseInt(product.expiration_time)).toString());


  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    //   <div>
    //     <div className="row">
    //     <div className="col s12 m6">
    //       <div className="card">
    //         <div className="card-image">
    //         <img src={`/images/${product.image}`} alt='screenshot'/>
    //           <span className="card-title">{product.name}</span>
    //           <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">bid</i></a>
    //         </div>
    //         <div className="card-content">
    //             <div>
    //                 <div>

    //                 </div>
    //             </div>
    //           <p>{product.description}</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   </div>

    <div className="row section">
      <div className="col s6 image-holder">
        <img src={`/images/${product.image}`} alt="screenshot" />
      </div>
      <div className="col s6 image-holder">
        <div className="col s12 card">
          <div className="col s12 product-title">
            <h3>{product.name}</h3>
          </div>
          <div className="col s12 price-box">
            <div className="col s6 price">
              <h6>Description: {product.description}</h6>
              <h6>Starting Price: ${product.starting_price}</h6>
              <h6>Current Bid: ${product.current_price}</h6>
              <h6>Expiration Date: {new Date(parseInt(product.expiration_time)).toLocaleString()}</h6>
              {console.log(new Date(product.expiration_time).toLocaleString())}
              <div className="input-field col s6">
                {/* <input placeholder="Enter Bid" id="first_name" type="text" className="validate"/>
          <label for="first_name">Enter Bid!</label>
          <button className="btn waves-effect waves-light" type="submit" name="action">Submit!
  </button> */}
                <BidForm
                  productId={product._id}
                  current_price={product.current_price}
                  toggle={toggle}
                  expiration_time={product.expiration_time}
                  setToggle={setToggle}
                />
              </div>
            </div>
            <div className="col s6 bid-buttons"></div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default SingleProduct;
