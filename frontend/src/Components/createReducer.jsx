import { Children, createContext, useContext, useReducer } from "react";

const cartStateContext = createContext();
const cartDispatchContext = createContext();

const Reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          image: action.image,
          qty: action.qty,
          price: action.price,
          size: action.size,
        },
      ];
    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "DROP":
      let NewArr = [];
      return NewArr;

    default:
      console.log("error in reducer!");
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, []);
  return (
    <cartDispatchContext.Provider value={dispatch}>
      <cartStateContext.Provider value={state}>
        {children}
      </cartStateContext.Provider>
    </cartDispatchContext.Provider>
  );
};
export const useCart = () => useContext(cartStateContext);
export const useCartDispatch = () => useContext(cartDispatchContext);
