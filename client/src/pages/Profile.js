import React, { useState } from "react";
import ProductList from '../components/ProductList';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { ADD_PRODUCT } from '../utils/mutations';
import { useMutation } from '@apollo/client';


const Profile = () => {
    const [formState, setFormState] = useState({ name: '', description: '',  image:'', starting_price:'', category:'' });
    const { loading, data } = useQuery(QUERY_ME);
    const [addProduct, { error }] = useMutation(ADD_PRODUCT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            // const mutationResponse = 
            return await addProduct({
                variables: { name: formState.email, description: formState.password, image: formState.image, starting_price: formState.starting_price, category: formState.category },
            });
            // const token = mutationResponse.data.login.token;
            // Auth.login(token);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };


    const products = data?.me.listings || [];
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
            <div className="row">
                <h5>Create Product Listing</h5>
                <form onSubmit={handleFormSubmit} className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input name="name" onChange={handleChange} type="text" className="validate" />
                            <label for="name">Name</label>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <input name='image' onChange={handleChange} type="text" className="validate" />
                                <label for="Image">Image</label>
                            </div>
                            <div className="row">
                                <div className="input-field col s3">
                                    <input name='price' onChange={handleChange} id="price" type="text" className="validate" />
                                    <label for="price">Price</label>
                                </div>
                            </div>
                        </div>
                        <div className="input-field col s12">
                            <input name='description' onChange={handleChange} id="description" type="text" className="validate" />
                            <label for="description">Description</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <select name='category' onChange={handleChange} className="browser-default">
                                <option value="" disabled selected>Choose Product Category</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                            </select>
                            {/* <label>Materialize Select</label> */}
                        </div>
                    </div>
                </form>
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