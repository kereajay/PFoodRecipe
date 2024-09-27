import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

function Navbar() {
  const [mdisplay, setMdisplay] = useState(false);
  const [cross, setCross] = useState(false);
  const [burger,setBurger]=useState(true)
  return (
    <>
      <div className="px-4 lg:flex justify-between py-2 md:flex sm:hidden">
        <div className="flex items-center gap-1">
          <img
            src="https://static.wixstatic.com/media/15b7a8_045bf755565d40c19e5e8cccec38910a~mv2.png/v1/fill/w_422,h_338,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/KITCHEN%20RECIPE%20LOGO.png"
            alt=""
            width={70}
          />
          <p className="text-xl font-bold text-green-700">Recipe</p>
        </div>
        <div>
          <Link to={"/cart"}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/17147/17147371.png"
              alt=""
              width={50}
            />
          </Link>
        </div>
      </div>
      <div className="lg:hidden md:hidden mt-2 mb-2 px-2">
        <p className="text-4xl">
          {" "}
         {burger&& <GiHamburgerMenu onClick={()=>{setMdisplay(true),setCross(true),setBurger(false)}}/>}
          {cross&&<ImCross onClick={()=>{setBurger(true),setCross(false),setMdisplay(false)}}/>}
        </p>
        <div className=" mt-5 px-2 ">
          {mdisplay && (
            <div className="flex flex-col gap-y-8 ">
              <div className="flex items-center gap-1">
                <img
                  src="https://static.wixstatic.com/media/15b7a8_045bf755565d40c19e5e8cccec38910a~mv2.png/v1/fill/w_422,h_338,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/KITCHEN%20RECIPE%20LOGO.png"
                  alt=""
                  width={70}
                />
                <p className="text-xl font-bold text-green-700">Recipe</p>
              </div>
              <div>
                <Link to={"/cart"}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/17147/17147371.png"
                    alt=""
                    width={50}
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
