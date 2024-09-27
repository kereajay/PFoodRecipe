import { createContext, useEffect, useReducer, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Food from "./Components/Food";
import Home from "./Components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Details from "./Components/Details";
import Cart from "./Components/Cart";
import { IoLogoYoutube } from "react-icons/io";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Usercontext = createContext();
const initialstate = {
  favs: [],
};
const reducefn = (state, action) => {
  switch (action.type) {
    case "addfavs":
      return {
        ...state,
        favs: [...state.favs, action.payload],
      };
      case "removefavs":
        return{
          ...state,
          favs:state.favs.filter((item)=>item.idMeal!=action.payload)
        }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(
    reducefn,
    JSON.parse(localStorage.getItem("favsl")) || initialstate
  );
  useEffect(() => {
    localStorage.setItem("favsl", JSON.stringify(state));
  }, [state]);

  return (
    <>
      <Usercontext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Food />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Details/:id" element={<Details />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer/>
      </Usercontext.Provider>
    </>
  );
}

export default App;
