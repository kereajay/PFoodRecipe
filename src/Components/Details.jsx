import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IoLogoYoutube } from "react-icons/io";
import { Link } from 'react-router-dom'

function Details() {
    const { id } = useParams();
    const [fooddetails, setFooddetails] = useState([]);
    // const [ids,setIds]=useState(id);
    console.log(id)

    async function Detailsid() {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        const data = await res.json();
        console.log(data.meals[0]);
        // return data.meals[0]
        setFooddetails(data.meals[0]);
        console.log(fooddetails)
    }
    useEffect(() => {
        Detailsid()
        // .then((results)=>{
        //     console.log(results)
        //     setFooddetails(results)
        // })
        // console.log(Detailsid());

    }, [id])
    // Detailsid()

    return (
        <div className='py-5'>
            <div className=' w-[85%] m-auto '>
                <div>
                    <img src={fooddetails.strMealThumb} alt="" width={450} />

                    <div className='py-4 px-2'>
                        <p className='text-3xl font-semibold'>Name:- <span>{fooddetails.strMeal}</span> </p>
                        <p className='text-lg font-semibold'>MealId:- <span>{fooddetails.idMeal}</span> </p>
                        <p className='text-lg font-semibold'>Categorey:- <span>{fooddetails.strCategory}</span> </p>
                    </div>
                </div>
                <div>
                    <h1 className='text-3xl font-bold'>How To Prepare It?</h1>
                    <br />
                    <p>{fooddetails.strInstructions}</p>
                    <br />
                    <Link to={fooddetails.strYoutube}> <p className='flex items-center text-red-600'><IoLogoYoutube /> <span className='pl-2 text-blue-400'> Watch video on youtube </span>
                    </p></Link>
                   
                    <br />
                    <br />
                    <h1 className='text-3xl font-bold'>Ingredient</h1>
                    <p className='text-lg'>{fooddetails.strIngredient1}</p>
                    <p className='text-lg'>{fooddetails.strIngredient2}</p>
                    <p className='text-lg'>{fooddetails.strIngredient3}</p>
                    <p className='text-lg'>{fooddetails.strIngredient4}</p>
                    <p className='text-lg'>{fooddetails.strIngredient5}</p>
                    <p className='text-lg'>{fooddetails.strIngredient6}</p>
                    <p className='text-lg'>{fooddetails.strIngredient7}</p>
                    <p className='text-lg'>{fooddetails.strIngredient8}</p>
                    <p className='text-lg'>{fooddetails.strIngredient9}</p>
                        
                    

                </div>
            </div>

        </div>
    )
}

export default Details
