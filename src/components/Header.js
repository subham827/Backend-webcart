
import React from 'react'
import { Container,Navbar,Nav,Badge,Dropdown,Button } from "react-bootstrap"
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CartState } from '../Context/Context'
import { useLocation } from 'react-router-dom'
import { FormControl } from 'react-bootstrap'
import "../style/index.css";
const Header = ({carte,setLog,name,i,setI}) => {
  
    const {
        state: { cart },
        productState : { searchQuery },
        productDispatch,
      } = CartState();
    
    const logout = ()=>{
       localStorage.clear()
         window.location.reload() 
       
         setLog(false)

    }
  
  return (
    <>
    <Navbar bg="dark" variant='dark' >
        <Container>
            <Navbar.Brand>
                
                    {/* <Link to = "/" style={{ "textDecoration" : "none"}}>Shopping Cart</Link> */}
                    
                    <p><span style={{color:"cornflowerblue"}}>{name} </span>E-cart</p>
                    
                    </Navbar.Brand>

                    {useLocation().pathname.split("/")[1] !== "cart" && (
          <Navbar.Text className="search">
            <FormControl
              
              type="search"
              placeholder="Search a product..."
              className="m-auto search"
              aria-label="Search"
              onClick={()=> setI(0)}
              onChange={(e) => {
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
          </Navbar.Text>
        )}
                    <Nav>
                        <Dropdown alignRight >
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <FaShoppingCart color="white" fontSize="25px"></FaShoppingCart>
                                <Badge>{carte.length}</Badge>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                            {carte.length>0?(<>
                              <Link to='/cart'>Checkout</Link>
                            {carte.map((prod) => {
                                 return (
                                    <div>
                                      <h3>{prod.prod.title}</h3>
                                      <img src={prod.prod.image} width="60px" ></img>
                                      <p>Rs. {prod.prod.price}</p>
                                      
                                      <hr></hr>
                                      
                                    </div>
                                  )
                            })
                            }
                           
                           
                            </>):(<><span>Cart is Empty</span></>)}
                            </Dropdown.Menu>


                        </Dropdown>
                    </Nav>
                   
                    
                        <Nav>{useLocation().pathname.split("/")[1] !== "cart" && (<Button onClick={logout}>Log out</Button>)}</Nav>
        </Container>
    </Navbar>
    </>
  )
}

export default Header
