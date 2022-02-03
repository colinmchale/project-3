import React from 'react';
// Import `<Link>` component from React Router for internal hyperlinks
import { Link } from 'react-router-dom';

const ProductList = ( {products} ) => {
  if (!products.length) {

    return <h3>No Thoughts Yet</h3>;
  }
  return (
    <div>


      {products &&
        products.map((product) => (
<div class="row" key={product._id}>
    <div class="col s12 m7">
      <div class="card">
        <div class="card-image">
          <img src={`images/${product.image}`} alt='screenshot'/>
          <span class="card-title">{product.name}</span>
        </div>
        <div class="card-content">
        <p>{product.description}</p>
        </div>
        <div class="card-action">
        <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/products/${product._id}`}
            />
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