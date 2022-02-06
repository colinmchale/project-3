import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
// import { useQuery } from '@apollo/client';
// import { QUERY_PRODUCT } from '../utils/queries';
import { ADD_BID } from '../../utils/mutations';
import { UPDATE_PRODUCT_PRICE, ADD_ORDER } from '../../utils/mutations';
// import { QUERY_USERS } from '../../utils/queries';

const PlaceBid = ({ productId, current_price, expiration_time, order, bid }) => {
    
    const [expired, setExpired] = useState(false);
    const currentHighBid = current_price;
    const [newBid, setHighBid] = useState('');
    //   const [characterCount, setCharacterCount] = useState(0);

    // const [getUsers] = useMutation(QUERY_USERS);
    const [addOrder] = useMutation(ADD_ORDER);
    const [addBid] = useMutation(ADD_BID);
    const [updateProductPrice] = useMutation(UPDATE_PRODUCT_PRICE);


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(typeof productId);
        console.log(typeof newBid);

        try {
            // const seller =
            const { data } = await addBid({
                variables: { product: productId, price: parseFloat(newBid)},
            });
            console.log(data);
            console.log(newBid);
            console.log(current_price);
            if (newBid > currentHighBid) {
                console.log('testestes');
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

    function expirationDate () {
      document.getElementById('bidBtn').style.display = "none";
      document.getElementById('bidInput').style.display = "none";
    }

    setInterval(() => {
      let expiration = expiration_time
      if (expiration <= Date.now()) {
        // console.log('im an expiration');
        // console.log(expiration);
        // console.log('the time currently?');
        // console.log(Date.now());
        expirationDate();
        setExpired(true);
      } else {
        document.getElementById('bidBtn').style.visibility = "visible";
        document.getElementById('bidInput').style.visibility = "visible";

      }
    }, 100);

    const handleChange = (event) => {
        const { name, value } = event.target;
    console.log(name);
    console.log(value);
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

