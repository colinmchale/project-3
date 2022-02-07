import React from "react";
import { useState } from "react";
// Import the `useParams()` hook from React Router
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import BidForm from "../components/BidForm";
// import moment from 'moment';

// import CommentList from '../components/CommentList';
// import CommentForm from '../components/CommentForm';

import { QUERY_PRODUCT, QUERY_BIDS, QUERY_ORDERS } from "../utils/queries";



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
  const { loading: bidLoading, data: bidData } = useQuery(QUERY_BIDS, {
    variables: { product: productId },
  });
  // const { loading: orderLoading, data: orderData } = useQuery(QUERY_ORDERS, {
  //   variables: { product: productId },
  // });

  const product = data?.product || {};
  const bids = bidData?.bids || [];
  // const order = orderData?.orders || {};
  console.log(bids);
  // console.log(order);
  // console.log(parseInt(product.expiration_time));
  // console.log(new Date(parseInt(product.expiration_time)).toString());
  

  setInterval(() => {
    let timer = document.getElementById('timer');
    let time = document.getElementById('time');
    // timer.style.display = "none";
    // time.style.display = "none";
    let totalSecondsRemaing = (Math.floor((product.expiration_time - Date.now())/1000));
    let remainingMinutes = Math.floor(totalSecondsRemaing/60);
    // console.log(remainingMinutes)
    
    let remainingSeconds = totalSecondsRemaing - (remainingMinutes*60);
    // if(remainingMinutes){
      // timer.style.display = "visible";
      // time.style.display = "visible";
  // time.textContent =remainingMinutes + ' minutes and ' + remainingSeconds + ' seconds.';
    // }


}, 1000)

  const styles = {
    bigDiv: {
      paddingTop: "50px",
    },
    imageCard: {
      display: "flex",
      justifyContent: "flex-end",
    },
    BidCard: {
      display: "flex",
      justifyContent: "center"
    },
    image: {
      maxWidth: "70%",
      maxHeight: "70%",
      marginTop: "6%",
      marginRight: "15%",
      borderRadius: '20px',
      boxShadow: '3px 3px'
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="row section">
      <div style={styles.bigDiv}>
        <div className="col s6 image-holder" style={styles.imageCard}>
          <img src={`/images/${product.image}`} alt="screenshot" className="center" style={styles.image}/>
        </div>
        <br></br>
        <div className="col s6 image-holder">
          <div className="col s12 card">
            <div className="col s12 product-title" style={styles.BidCard}>
              <h3>{product.name}</h3>
            </div>
            <div className="col s12 price-box" >
              <div className="col s6 price">
                <h6>Description: {product.description}</h6>
                <h6>Starting Price: ${product.starting_price}</h6>
                <h6>Current Bid: ${product.current_price}</h6>
                <h6>
                  Expiration Date:{" "}
                  {new Date(parseInt(product.expiration_time)).toLocaleString()}
                </h6>
                {/* {console.log(new Date(product.expiration_time).toLocaleString())} */}
                <div className="input-field col s6">
                  {/* <h6 id='timer'>Seconds Remaining: </h6>
                  <h6 id='time'>Seconds Remaining: </h6> */}
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
                    bids={bids}
                    // order={order}
                  />
                </div>
              </div>
              <div className="col s6 bid-buttons"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
