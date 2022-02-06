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
<>

<div className="row" key={product._id}>
    <div className="col s12 m7">
      <div className="card">
        <div className="card-image">
          <img src={`images/${product.image}`} alt='screenshot'/>
        </div>
        <div className="card-content">
          <span className="card-title center">{product.name}</span>
        <p className="center">{product.description}</p>
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
</>
            ))
            }
  </div>




  );
  
};

export default ProductList;