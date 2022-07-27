import React, { useContext,useReducer } from 'react'
import { createContext } from 'react'
import { cartReducer } from './Reducer.js'
import { productReducer } from './Reducer.js'



const Cart = createContext()

const Context = ({ children }) => {
   
    
   
   
    const products = [
        
          {
             "id": "1" ,
            
              "title": "Bretling watch",
              "price": 9999,
              "rite": "watch",
              "image":  "./image/Bretlingwatch.png" ,
              "quantity" : 1
            
          },
          {
             "id": "2" ,
            
              "title": "Fossil watch",
              "price": 4999,
              "rite": "watch",
              "image":  "image/fossil.webp",
              "quantity" : 1
            
          },
          {
             "id": "3" ,
            
              "title": "Realme watch",
              "price": 3999,
              "rite": "watch",
              "image":  "image/52c98624-390f-4aec-b3b2-9a8b81ad431f1611133634601-Realme-Unisex-Black-SpO2-Monitor-and-Large-Color-Touch-Scree-7.webp",
              "quantity" : 1
            
          },
          {
             "id": "4" ,
            
              "title": "Premium shirt",
              "price": 999,
              "rite": "shirt",
              "image":  "image/Shirt1.jpg" ,
              "quantity" : 1
            
          },
          {
             "id": "5" ,
            
              "title": "lenin shirt",
              "price": 1699,
              "rite": "shirt",
              "image":  "image/shirt2.webp" ,
              "quantity" : 1
            
          },
          {
             "id": "6" ,
            
              "title": "Vimal shirt",
              "price": 1999,
              "rite": "shirt",
              "image":  "image/shirt3.jpg_2000Wx3000H" ,
              "quantity" : 1
            
          },
          {
             "id": "7" ,
            
              "title": "Premium blazer",
              "price": 2999,
              "rite": "blazer",
              "image":  "image/blazer1.jpg" ,
              "quantity" : 1
            
          },
          {
             "id": "8" ,
    
              "title": "Silk blazer",
              "price": 9999,
              "rite": "blazer",
              "image":  "image/blazer2.jpg",
              "quantity" : 1 
            
          },
    {
        "id": "9" ,
            
              "title": "Classic blazer",
              "price": 19999,
              "rite": "blazer",
              "image":  "image/blazer3.jpg" ,
              "quantity" : 1
    
    },
    {
         "id": "10" ,
        
          "title": "FILA Shoes",
          "price": 1999,
          "rite": "shoes",
          "image":  "image/shoesfila.jpg" ,
          "quantity" : 1
    
    },
    {
         "id": "11" ,
        
          "title": "Sparx shoes",
          "price": 999,
          "rite": "shoes",
          "image":  "image/shoessparx.jpg" ,
          "quantity" : 1
    
    },
    {
         "id": "12" ,
        
          "title": "Puma shoes",
          "price": 9999,
          "rite": "shoes",
    
          "image": "image/shoespuma.jpg" ,
          "quantity" : 1
    
    }
        
      ]
    


    
    
    
    const [state,dispatch] = useReducer(cartReducer , {
        products : products,
        cart:[]

    });
    const [productState, productDispatch] = useReducer(productReducer, {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
      });

   
  return (
    <Cart.Provider value={{ state,dispatch,productState,productDispatch }}>
     {children}
   
     
    </Cart.Provider>
  )
}

export default Context

export const CartState = ()=>{
    return useContext(Cart)
}