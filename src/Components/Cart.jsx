import React, { useContext } from "react";
import { Usercontext } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { state, dispatch } = useContext(Usercontext);
  const navigate=useNavigate();

  const handleremove=(id)=>{
    dispatch({type:"removefavs",payload:id})
    toast.success("Recipe removed from wishlist",{
        autoClose:1000,
      })

  }
  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 w-[95%] mx-auto py-10">
        {state.favs &&
          state.favs.map((item) => {
            return (
              <>
                <div className=" shadow-2xl rounded-lg overflow-hidden">
                  <div>
                    <img
                      onClick={() => navigate(`/Details/${item.idMeal}`)}
                      src={item.strMealThumb}
                      alt=""
                      width={350}
                      className="rounded-xl hover:scale-105 transition-all duration-300"
                    />
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold">{item.strMeal}</h1>
                    <p className="text-xl hover:cursor-pointer" onClick={()=>handleremove(item.idMeal)} >❤️</p>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}

export default Cart;
