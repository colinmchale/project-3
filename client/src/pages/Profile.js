import React, { useState } from "react";
import ProductList from '../components/ProductList';
import MyBids from '../components/MyBids';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { QUERY_USER_BIDS } from '../utils/queries';
import { QUERY_CATEGORIES } from '../utils/queries';
import { ADD_PRODUCT } from '../utils/mutations';
import { useMutation } from '@apollo/client';


const Profile = () => {
    const { loading: loadingCategory, data: categoryData } = useQuery(QUERY_CATEGORIES);
    const [formState, setFormState] = useState({ name: '', description: '',  image:'', starting_price:'', category:'' });
    const { loading, data } = useQuery(QUERY_ME);
    const [addProduct, { error }] = useMutation(ADD_PRODUCT);
    const myId = data?.me._id;
    const myName = data?.me.firstName;
    // console.log('myId');
    // console.log(typeof myId);
    // console.log(myId);
    const { loading: loadingUserBids, data: userBidData } = useQuery(QUERY_USER_BIDS, {
        variables: {user: myId },
    });

    const myBids = userBidData?.userBids || [];
    console.log('userBidData')
    console.log(userBidData)
    console.log('my bids')
    console.log(myBids)

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            // const mutationResponse = 
            const newProduct = await addProduct({
                variables: { name: formState.name, description: formState.description, starting_price: parseFloat(formState.starting_price), category: formState.category },
            });
            console.log(newProduct);
            window.location.reload();
            return newProduct;
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

        console.log(formState);
        console.log(formState.starting_price);
        console.log(typeof formState.starting_price);
        console.log(typeof parseFloat(formState.starting_price));
    };

    const styles = {
        createProduct: {
            paddingTop: "15%"
        },
        spacing: {
            paddingTop: "10%"
        },
    }

    const products = data?.me.listings || [];
    return (
        <div className="container center">
            <div className="flex-row justify-center">
                <div className="col-12 col-md-8 mb-3">
                    {loading ? (
                        <div>Loading...</div>
                        ) : ( <>
                    <div style={styles.spacing}>
                            <h4>Welcome, {myName}!</h4>
                        <h4>Your Listings</h4>
                    </div>
                    <br></br>
                        <ProductList
                            className="align-content-center justify-content-center"
                            products={products}
                            title="Some Food for Thoughts..." /></>
                    )}
                </div>
                <div className="col-12 col-md-8 mb-3">
                    {loading ? (
                        <div>Loading...</div>
                    ) : ( <>
                    <div style={styles.spacing}>
                        <h4>Products I'm Bidding on!</h4>
                    </div>
                    <br></br>
                        <MyBids
                            myBids={myBids}
                            title="Some Food for Thoughts..." /> </>
                    )}
                </div>
            </div>
            <div className="row" style={styles.createProduct}>
                <h4>Create Product Listing</h4>
                <br></br>
                <br></br>
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
                                    <input name='starting_price' onChange={handleChange} id="starting_price" type="text" className="validate" />
                                    <label for="starting_price">Price</label>
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
                                {categoryData?.categories.map(category => 
                                    <option value={category._id} name='category'>{`${category.name}`}</option>

                                )}
                                {/* <option value="2">Option 2</option>
                                <option value="3">Option 3</option> */}
                            </select>
                            {/* <label>Materialize Select</label> */}
                        </div>
                    </div>
                    <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
                </form>
            </div>
        </div>
    )
}

export default Profile;

