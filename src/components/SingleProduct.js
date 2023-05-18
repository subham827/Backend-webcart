import React from "react";
import { CartState } from "../Context/Context";
import { useState,useEffect } from "react";
import { Button } from "react-bootstrap";


const SingleProduct = ({ prod,setLog,setCarte,setName,carte}) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  
  const [newcart, setNewcart] = useState([...cart]);
  
  async function addtocart(prod){
    
  

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
   
    setCarte(data.cart);
   
  
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
   
}
async function deletenote(prod){
 

  console.log("delete",prod.id);
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
  
  
   setCarte(data.cart);
  setNewcart(data.cart);
 
   
}

  

}


useEffect(()=>{
  populateCart();
 
},[])


  return (
   <>
   <div class="card" style={{width : "12rem",margin: "1rem"}}>
  <img src={prod.image} class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{prod.title}</h5>
    <p class="card-text">Rs.{prod.price}</p>
    {carte.some((item) => item.prod.id === prod.id) ? (
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
