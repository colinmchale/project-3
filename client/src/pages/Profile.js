import React from "react";
import ProductList from '../components/ProductList';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';

const Profile = () => {
    const { loading, data } = useQuery(QUERY_PRODUCTS);
    const products = data?.products || [];
    console.log(products)
    return (
        <div className="container">
            <div className="flex-row justify-center">
                <div className="col-12 col-md-8 mb-3">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <ProductList 
                            products={products}
                            title="Some Food for Thoughts..." />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile;

// const styles= {
//     display: "flex",
//     justifyContent: "center",
// }

// export default function Profile() {
//     return (
//         <>
//             <div>
//                 <div style={styles}>
//                     <h1>My Bids</h1>
//                 </div>
//                 <div  style={styles}>
//                     <div class="col s12 m5">
//                         <div class="card-panel teal">
//                             <span class="white-text">We will enter the image here in the card and link it to that specific product's page.
//                             </span>
//                             {/* <Link to={`/products/${product._id}`} /> */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div>
//                 <div style={styles}>
//                     <h1>My Products</h1>
//                 </div>
//                 <div  style={styles}>
//                     <div class="col s12 m5">
//                         <div class="card-panel teal">
//                             <span class="white-text">We will enter the image here in the card and link it to that specific product's page.
//                             </span>
//                             {/* <Link to={`/products/${product._id}`} /> */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }