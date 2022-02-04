import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
// import { useQuery } from '@apollo/client';
// import { QUERY_PRODUCT } from '../utils/queries';
import { ADD_BID } from '../../utils/mutations';
import { UPDATE_PRODUCT_PRICE } from '../../utils/mutations';

const PlaceBid = ({ productId, current_price, toggle, setToggle }) => {
    
    const currentHighBid = current_price;
    const [newBid, setHighBid] = useState('');
    //   const [characterCount, setCharacterCount] = useState(0);

    const [addBid] = useMutation(ADD_BID);
    const [updateProductPrice] = useMutation(UPDATE_PRODUCT_PRICE);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(typeof productId);
        console.log(typeof newBid);

        try {
            const { data } = await addBid({
                variables: { product_id: productId, price: parseFloat(newBid) },
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
            setToggle(!toggle);
            }
        } catch (err) {
            console.error(err);
        };
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
    console.log(name);
    console.log(value);
        setHighBid(value);
      };
    
      return (
        <div>
          <h4>What are your thoughts on this thought?</h4>
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
                style={{ lineHeight: '1.5' }}
                onChange={handleChange}
              ></textarea>
            </div>
    
            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Comment
              </button>
            </div>
          </form>
        </div>
      );
   
    
};
    export default PlaceBid;

