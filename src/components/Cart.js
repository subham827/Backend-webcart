import { ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Cart = ({ carte, setCarte }) => {
  console.log(carte)

  const increase = async (id, quantity) => {
    const req = await fetch(`http://localhost:8000/api/aqty`, {
      method: "PUT",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        quantity: quantity,
      }),
    });

    const data = await req.json();
    setCarte(data.cart);
   
  };
  
  
  const decrease = async (id, quantity) => {
    if(quantity == 1){
      alert("If you want the product to be removed please remove it from home page");
      return;
    }
    const req = await fetch(`http://localhost:8000/api/dqty`, {
      method: "PUT",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        quantity: quantity,
      }),
    });

    const data = await req.json();
    setCarte(data.cart);
  
  };

  var sum = 0;

  return (
    <div className="container d-flex">
      <Container>
        <Row>
          <Col>
          {carte.length > 0 ? (
          carte.map((prod) => {
            return (
              <div>
                <h2>{prod.prod.title}</h2>
                <img src={prod.prod.image} width="160px"></img>
                <p>Rs. {prod.prod.price}</p>
                <p>Quantity : {prod.prod.quantity}</p>
                <Button
                  onClick={() => increase(prod.prod.id, prod.prod.quantity)}
                >
                  +
                </Button>
                <Button
                  onClick={() => decrease(prod.prod.id, prod.prod.quantity)}
                >
                  -
                </Button>

                <p style={{ display: "none" }}>
                  {(sum = sum + prod.prod.price * prod.prod.quantity)}
                </p>
              </div>
            );
          })
        ) : (
          <div>Oops should not have reloaded the page. No worries go to <Link to="/">Home page</Link></div>
        )}
          </Col>
        </Row>
      
      </Container>

      <h2>Total : Rs {sum}</h2>

      <p>
        To remove or add item in cart head to the <Link to="/">Home page</Link>
      </p>
    </div>
  );
};

export default Cart;
