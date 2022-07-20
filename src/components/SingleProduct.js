import React from "react";
import { CartState } from "../Context/Context";
import { useState,useEffect } from "react";
import { Button } from "react-bootstrap";

const SingleProduct = ({ prod,setLog,setCarte,setName}) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  console.log(cart);
  const [newcart, setNewcart] = useState([...cart]);
  
  console.log(newcart);
  async function addtocart(prod){
    dispatch({type:"ADD_TO_CART",payload:prod})
    const req = await fetch("http://localhost:8000/api/acart",{
        method : "POST",
        headers : {
            'x-access-token' : localStorage.getItem('token'),
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
                prod : prod

        })
    }
    );
    const data = await req.json();
    setNewcart(data.cart);
    setCarte(data.cart);
    console.log(data);
}
async function populateCart(){
    const req = await fetch("http://localhost:8000/api/cart",{
        method : "GET",
        headers : {
            'x-access-token' : localStorage.getItem('token'),
            'Content-Type' : 'application/json'
        },
    }
    );
    const data = await req.json();
    if(data.status === 'ok')
   { 
    setName(data.name)
    setNewcart(data.cart);
    setCarte(data.cart);
    setLog(true);
    
  }
  else{
      setLog(false);
  }
    console.log(data);
}
async function deletenote(prod){
  dispatch({type:"REMOVE_FROM_CART",payload:prod})
  const req = await fetch("http://localhost:8000/api/dcart",{
      method : "DELETE",
      headers : {
          'x-access-token' : localStorage.getItem('token'),
          'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
              prod : prod

      })
  }
  );
  const data = await req.json();
  if(data.status == 'ok')
 {
  
  setNewcart(data.cart);
  setCarte(data.cart);
   
}

  console.log(data);

}

useEffect(()=>{
  populateCart();

  
},[])


  return (
   <>
   <div class="card" style={{width : "12rem"}}>
  <img src={prod.image} class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{prod.title}</h5>
    <p class="card-text">Rs.{prod.price}</p>
    {newcart.some((item) => item.prod.id === prod.id) ? (
              <Button  onClick={()=> deletenote(prod)} variant="danger" >Remove from Cart</Button>
          ) : (
            <Button  onClick={()=> addtocart(prod)} variant="primary">Add to Cart</Button>
          )}
  </div>
</div>
   
   </>
  );
};

export default SingleProduct;
