import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import React, { Suspense } from "react";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Signup from "./components/Signup";
import Login from "./components/Login"
import { useState,useEffect } from "react";
import { CartState } from "./Context/Context";

// const Home = React.lazy(() => import("./components/Home"));
import Home from "./components/Home";

function App() {
  const [windowsize,setWindowsize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize',()=>{
      setWindowsize(window.innerWidth);
    })

  }, []);
  const [carte, setCarte] = useState([]);
  const [name,setName] = useState("");
  const [i,setI] = useState(0);
  

  

  return (
    <>
      <BrowserRouter>
      {windowsize > 800 ? ( <><Header carte={carte} name={name} i={i} setI={setI} />

<Switch>
  <Suspense fallback={<div>Loading...</div>}>
    <Route path="/" exact>
      <Home setCarte={setCarte} setName={setName} carte={carte} i={i} setI={setI}/>
    </Route>

    <Route path="/cart">
      <Cart carte={carte} setCarte={setCarte}/>
    </Route>
    <Route path="/signup"><Signup></Signup></Route>
    <Route path="/login"><Login></Login></Route>
  </Suspense>
</Switch></>): (<div>Please Switch to desktop mode</div>)}
       
      </BrowserRouter>
    </>
  );
}

export default App;
