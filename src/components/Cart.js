
import { CartState } from '../Context/Context'



import { ListGroup,Button } from 'react-bootstrap'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';


const Cart = ({carte,setCarte}) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [qty,seTQty] = useState(1);
  const [indiviqty,setIndiviqty] = useState([]);

const increase = async (id,quantity)=>{
 

  console.log(qty);
  const req = await fetch(`http://localhost:8000/api/aqty`, {
    method : "PUT",
    headers : {
        'x-access-token' : localStorage.getItem('token'),
        'Content-Type' : 'application/json'
    },
    body : JSON.stringify({
        id : id,
        quantity : quantity

  })
  
  
  
  
})

const data = await req.json();
setCarte(data.cart);
console.log(data);
console.log(data.cart);

}
const decrease = async (id,quantity)=>{
 

  console.log(qty);
  const req = await fetch(`http://localhost:8000/api/dqty`, {
    method : "PUT",
    headers : {
        'x-access-token' : localStorage.getItem('token'),
        'Content-Type' : 'application/json'
    },
    body : JSON.stringify({
        id : id,
        quantity : quantity

  })
  
  
  
  
})

const data = await req.json();
setCarte(data.cart);
console.log(data);
console.log(data.cart);

}

const getquantity = async ()=>{
  const req = await fetch("http://localhost:8000/api/cart",{
    method : "GET",
    headers : {
        'x-access-token' : localStorage.getItem('token'),
        'Content-Type' : 'application/json'
    },
}
);
const data = await req.json();
setIndiviqty([...data.cart]);
console.log(indiviqty);



}

   var sum = 0;
   
  
  return (
  
    <div className='container d-flex'>
      
      <ListGroup>
        {carte.length>0?   carte.map((prod) => {
         return(
          <div>
          <h2>{prod.prod.title}</h2>
          <img src={prod.prod.image} width="160px" ></img>
          <p>Rs. {prod.prod.price}</p>
          <p>Quantity : {prod.prod.quantity}</p>
          <Button onClick={()=> increase(prod.prod.id,prod.prod.quantity)}>+</Button>
          <Button onClick={()=> decrease(prod.prod.id,prod.prod.quantity)}>-</Button>

          
          <p style={{display : "none"}}>
            {prod.prod.price = prod.prod.price * prod.prod.quantity}

          {sum+= prod.prod.price}
          </p>
          {/* <Button onClick={deletenote(prod.prod)}>Delete</Button> */}
          
        </div>
         )
        }) : <div>No items in cart</div>}

        

      </ListGroup>
      <h2>Total : Rs {sum}</h2>
      <p>To remove or add item in cart head to the <Link to="/">Home page</Link></p>
    
    </div>
  )
}

export default Cart