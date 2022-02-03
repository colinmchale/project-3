import React from 'react';

// Import the `useParams()` hook from React Router
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import CommentList from '../components/CommentList';
// import CommentForm from '../components/CommentForm';

import { QUERY_PRODUCT } from '../utils/queries';

const SingleProduct = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { productId } = useParams();

  const { loading, data } = useQuery(QUERY_PRODUCT, {
    // Pass the `thoughtId` URL parameter into query to retrieve this thought's data
    variables: { _id: productId },
  });

  const product = data?.product || {};
  console.log(product);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
      
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {product.name} <br />
        <span style={{ fontSize: '1rem' }}>
          {/* had this thought on {thought.createdAt} */}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {product.description}
        </blockquote>
      </div>

      {/* <div className="my-5">
        <CommentList comments={thought.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm thoughtId={thought._id} />
      </div> */}
    </div>
  );
};

export default SingleProduct;

    