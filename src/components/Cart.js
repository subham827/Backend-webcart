
import { CartState } from '../Context/Context'



import { ListGroup,Button } from 'react-bootstrap'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({carte}) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

   var sum = 0;
  
  return (
  
    <div className='productContainer'>
      
      <ListGroup>
        {carte.map((prod) => {
         return(
          <div>
          <h1>{prod.prod.title}</h1>
          <img src={prod.prod.image} width="160px" ></img>
          <p>Rs. {prod.prod.price}</p>
          <p style={{display : "none"}}>

          {sum+= prod.prod.price}
          </p>
          {/* <Button onClick={deletenote(prod.prod)}>Delete</Button> */}
          
        </div>
         )
        })}
      </ListGroup>
      <h1>Total : Rs {sum}</h1>
      <p>To remove or add item in cart head to the <Link to="/">Home page</Link></p>
    
    </div>
  )
}

export default Cart