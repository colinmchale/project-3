import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
// import { useQuery } from '@apollo/client';
// import { QUERY_PRODUCT } from '../utils/queries';
import { QUERY_BIDS } from '../../utils/queries';
import { QUERY_USERS } from '../../utils/queries';
import { ADD_BID } from '../../utils/mutations';
import { ADD_ORDER } from '../../utils/mutations';
import { UPDATE_PRODUCT_PRICE } from '../../utils/mutations';

const PlaceBid = ({ productId, current_price, expiration_time }) => {

  const currentHighBid = current_price;
  const [newBid, setHighBid] = useState('');
  //   const [characterCount, setCharacterCount] = useState(0);

  const {loading, data} = useQuery(QUERY_USERS);
  const users = data?.users || [];
  const [addBid] = useMutation(ADD_BID);
  const { data: bidData } = useQuery(QUERY_BIDS, {
    // Pass the `thoughtId` URL parameter into query to retrieve this thought's data
    variables: { product: productId },
  });
  const bids = bidData?.bids || [];
  console.log('this is bid data')
  console.log(bids)
  const [addOrder] = useMutation(ADD_ORDER);
  const [updateProductPrice] = useMutation(UPDATE_PRODUCT_PRICE);


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // function findSeller(users){
      // for (let i = 0; i < users.length; i++) {
      //     let listingData = users[i].listings;
      //     for(let j=0; j < listingData.length; j++){
      //       if(listingData[j]._id === productId){
      //             return users[i]._id;
      //           }
      //         }
      //       };
      //     };
          
          


      const { data } = await addBid({
        variables: { price: parseFloat(newBid), product: productId },
      });
      console.log(data);
      console.log(newBid);
      console.log(current_price);
      if (newBid > currentHighBid) {
        const { data } = updateProductPrice({
          variables: { _id: productId, current_price: parseFloat(newBid) },

          //   setCharacterCount(value.length);
        })
        window.location.reload();
        // Look at making this a component refresh rather than a page refresh^
      }
    } catch (err) {
      console.error(err);
    };
  }




  function expirationDate() {
    document.getElementById('bidBtn').style.display = "none";
    document.getElementById('bidInput').style.display = "none";
    try {
      bids.forEach((bid) => {
        if (bid.price === current_price) {
          const { data } = addOrder({
            variables: { buyer: bid.user._id, seller: bid.seller._id, product: productId, price: current_price }
          })
        }

      })
    } catch (err) {
      console.error(err);
    };

  }

  setInterval(() => {
    let expiration = expiration_time
    if (expiration <= Date.now()) {
      console.log('im an expiration');
      console.log(expiration);
      console.log('the time currently?');
      console.log(Date.now());
      expirationDate();
    } else {
      document.getElementById('bidBtn').style.visibility = "visible";
      document.getElementById('bidInput').style.visibility = "visible";

    }
  }, 1000);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name);
    // console.log(value);
    setHighBid(value);
  };

  return (
    <div>
      <p
      // className=
      // {`m-0 
      // ${
      //   characterCount === 280 || error ? 'text-danger' : ''
      // }`}
      >
        {/* Character Count: {characterCount}/280
            {error && <span className="ml-2">Something went wrong...</span>} */}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12 col-lg-9">
          <textarea
            name="newBid"
            placeholder="Add your bid..."
            value={newBid}
            className="form-input w-100"
            id="bidInput"
            style={{ lineHeight: '1.5' }}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-primary btn-block py-3" type="submit" id="bidBtn">
            Submit Bid
          </button>
        </div>
      </form>
    </div>
  );


};
export default PlaceBid;

