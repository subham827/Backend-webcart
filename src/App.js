import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import React, { Suspense } from "react";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Signup from "./components/Signup";
import Login from "./components/Login"
import { useState } from "react";
import { CartState } from "./Context/Context";

const Home = React.lazy(() => import("./components/Home"));

function App() {
  
  
  const [carte, setCarte] = useState([]);
  const [name,setName] = useState("");
  
  console.log(carte);

  return (
    <>
      <BrowserRouter>
        <Header carte={carte} name={name}  />

        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            <Route path="/" exact>
              <Home setCarte={setCarte} setName={setName} />
            </Route>

            <Route path="/cart">
              <Cart carte={carte} setCarte={setCarte}/>
            </Route>
            <Route path="/signup"><Signup></Signup></Route>
            <Route path="/login"><Login></Login></Route>
          </Suspense>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
