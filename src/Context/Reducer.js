export const cartReducer = (state,action) => {
    switch(action.type){
        // case "ADD_TO_CART":
        //     return {
        //         ...state,
        //         cart: [...state.cart,{...action.payload}]
        //     }
        // case "REMOVE_FROM_CART":
        //     return {
        //         ...state,
        //         cart: state.cart.filter(product => product.id !== action.payload.id)
        //     }
            case "SEARCH_PRODUCT":
                return{
                    ...state,
                    products: state.products.filter(product => product.title.toLowerCase().includes(action.payload.toLowerCase()))


                }
                case "ASCENDING_PRICE":
                    return{
                        ...state,
                        products: state.products.sort((a,b)=>{
                            return a.price - b.price
                        }
                        )
                    }
                    case "DESCENDING_PRICE":
                        return{
                            ...state,
                            products: state.products.sort((a,b)=>{
                                return b.price - a.price
                            }
                            )
                        }
                      case "INCREMENT_QUANTITY":
                        let updatedCart = state.cart.map(product => {
                            if(product.id === action.payload.id){
                                return {...product,quantity:product.quantity + 1};
                            }
                            return product;
                        }
                        )
                        return{
                            ...state,
                            cart: updatedCart
                        }

        default:
            return state;
    }
}

export const productReducer = (state, action) => {
    switch (action.type) {
      case "SORT_BY_PRICE":
        return { ...state, sort: action.payload };
      case "FILTER_BY_STOCK":
        return { ...state, byStock: !state.byStock };
      case "FILTER_BY_DELIVERY":
        return { ...state, byFastDelivery: !state.byFastDelivery };
      case "FILTER_BY_RATING":
        return { ...state, byRating: action.payload };
      case "FILTER_BY_SEARCH":
        return { ...state, searchQuery: action.payload };
      case "CLEAR_FILTERS":
        return { byStock: false, byFastDelivery: false, byRating: 0 };
      default:
        return state;
    }
  };
  