import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { Usercontext } from "../App";
import { toast } from "react-toastify";

function Food() {
  const { state, dispatch } = useContext(Usercontext);

  const [fooddata, setFooddata] = useState([]);
  const [searchdata, setSearchdata] = useState([]);
  const [searchinputval, setSearchinputval] = useState("");
  const [selectedval, setSelectedval] = useState("French");
  const navigate = useNavigate();

  // const selectedval="french"
  async function fooddatafn() {
    console.log(selectedval);
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=French`
    );
    const data = await res.json();
    console.log(data);
    console.log(data.meals);

    setFooddata(data.meals);
    setSearchdata(data.meals);
    // setDefaultval(data.meals)
  }

  useEffect(() => {
    fooddatafn();
  }, []);
  const handlesearch = (e) => {
    setSearchinputval(e.target.value);
    const searchfilter = fooddata.filter((item) => {
      // const ajay=item.strMeal.split(" ").join("").toLowerCase();
      return item.strMeal
        .split(" ")
        .join("")
        .toLowerCase()
        .startsWith(searchinputval.toLowerCase());
    });
    setSearchdata(searchfilter);
  };
  const handleadd = (id) => {
    // Find the item to be added
    const favadd = fooddata.find((item) => item.idMeal === id);
  
    // Check if the item already exists in the favorites array by comparing idMeal
    const isAlreadyFav = state.favs.some((fav) => fav.idMeal === favadd.idMeal);
  
    // if (isAlreadyFav) {
    //   toast.warning("recipe already exists in wishlist")
      
    // } else {
      // If the item doesn't exist, add it to the favorites
      dispatch({ type: "addfavs", payload: favadd });
      toast.success("Recipe added to Wishlist",{
        autoClose:1000,
      })
    // }
  };
  
  const handleremove = (id) => {
    dispatch({ type: "removefavs", payload: id });
    toast.success("Recipe removed from wishlist",{
      autoClose:1000,
    })
  };
  

  return (
    <>
      <div>
        <div className="flex w-full m-auto ">
          <div className="m-auto">
            <input
              type="text"
              value={searchinputval}
              onChange={(e) => handlesearch(e)}
              className="border-2 w-96 h-10 rounded-2xl p-2"
              placeholder="Search recipies..."
            />
          </div>
          {/* <div>
            <label htmlFor="country" className="text-lg font-semibold px-2">Filter by</label>
            <select
              name="country"
              id="country"
              className="border-2 border-slate-600 w-44 text-lg"
              value={selectedval}
              onChange={(e) => setSelectedval(e.target.value)}
            >
              <option value="Indian">Indian</option>
              <option value="American">American</option>
              <option value="Greek">Greek</option>
              <option value="French">French</option>
              <option value="Egyptian">Egyptian</option>
              <option value="Filipino">Filipino</option>
              <option value="Dutch">Dutch</option>
              <option value="Croatian">Croatian</option>
              <option value="Chinese">Chinese</option>
              <option value="Canadian">Canadian</option>
              <option value="British">British</option>
              <option value="Irish">Irish</option>
              <option value="Italian">Italian</option>
              <option value="Jamaican">Jamaican</option>
              <option value="Japanese">Japanese</option>
              <option value="Kenyan">Kenyan</option>
              <option value="Malaysian">Malaysian</option>
              <option value="Mexican">Mexican</option>
              <option value="Moroccan">Moroccan</option>
              <option value="Polish">Polish</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Russian">Russian</option>
              <option value="Spanish">Spanish</option>
              <option value="Thai">Thai</option>
              <option value="Tunisian">Tunisian</option>
              <option value="Turkish">Turkish</option>
              <option value="Vietnamese">Vietnamese</option>
            </select>
          </div> */}
        </div>
      </div>
      <br />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 w-[95%] mx-auto py-10">
        {searchdata &&
          searchdata.map((items) => {
            const isliked = state.favs.some((fav) => fav.idMeal === items.idMeal);
            return (
              <>
                <div className=" shadow-2xl rounded-lg overflow-hidden">
                  <div>
                    <img
                      onClick={() => navigate(`/Details/${items.idMeal}`)}
                      src={items.strMealThumb}
                      alt=""
                      width={350}
                      className="rounded-xl hover:scale-105 transition-all duration-300"
                    />
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold">{items.strMeal}</h1>
                    <p className="text-xl">
                      {isliked ? (
                        <p
                          onClick={() => handleremove(items.idMeal)}
                          className=" hover:cursor-pointer "
                        >
                          ❤️
                        </p>
                      ) : (
                        <FaRegHeart onClick={() => handleadd(items.idMeal)} />
                      )}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}

export default Food;
