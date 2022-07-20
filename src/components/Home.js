import React, { Suspense } from "react";
import { CartState } from "../Context/Context";
import "../style/index.css"
import { Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
const SingleProduct = React.lazy(() => import("./SingleProduct"));

const Home = ({setCarte,setName}) => {
  const {
    state: { products },
    productState: { searchQuery },
    dispatch
  } = CartState();
  console.log(products);
  
  const[log,setLog] = useState(true);
  
 
 const descendingOrder = ()=>{
    dispatch({
        type:"DESCENDING_PRICE"
    })
         
 }
 const ascendingOrder = ()=>{
    dispatch({
        type:"ASCENDING_PRICE"
    })
         
 }
 const transformProducts = ()=>{
  let sortedproducts = products;
  if(searchQuery.length > 0){
      sortedproducts = products.filter((product)=>{
          return product.title.toLowerCase().includes(searchQuery.toLowerCase())
      }
      )
  }
  return sortedproducts;
 }
 
 
  return (
  <> {log ?( <>
    <div className="container d-flex justify-content-evenly my-4">


    <Button onClick={descendingOrder}>Sort High to Low</Button>
    <Button onClick={ascendingOrder}>Sort Low to High</Button>
  
    </div>

  
  <div className="productContainer">
    <ErrorBoundary>

  {transformProducts().map((prod) => {
      return (
        <Suspense fallback={<h1>Loading...</h1>}>
           {/* <ErrorBoundary
        
        > */}
          
          <SingleProduct prod={prod} key={prod.id} setLog={setLog} setCarte={setCarte} setName={setName} ></SingleProduct>;
    {/* </ErrorBoundary> */}
        </Suspense>
      )
    })}
    </ErrorBoundary>
    </div>
</>): <div><h1><Link to = "/login">Login</Link> to continue</h1></div>}</>
  );
};

export default Home;
