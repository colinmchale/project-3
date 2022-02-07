import React, { useState } from "react";
import ProductList from "../components/ProductList";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_ORDERS } from "../utils/queries";
import { QUERY_CATEGORIES } from "../utils/queries";
import { ADD_PRODUCT } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const OrderHistory = () => {

  const { loading, data } = useQuery(QUERY_ME);
  const {loading: orderLoading, data: orderData} = useQuery(QUERY_ORDERS);

  const orders = orderData?.orders || [];
  console.log(orderData);
  console.log(orders);

  return (
    <div className="container center">
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ProductList
              className="align-content-center justify-content-center"
              products={orders}
              title="Some Food for Thoughts..."
            />
          )}
        </div>
      </div>
      
    </div>
  );
};

export default OrderHistory;
