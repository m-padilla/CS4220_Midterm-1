// The file to interact with the deck of cards api
import axios from 'axios';
import 'dotenv/config';

// base is the most common part of the api url before the it is made dynamic
const base = `https://www.themealdb.com/api/json/v1/${process.env.API_KEY}`;

// www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
export async function getMealQuery (meal){
     try{
          const apiURL = `${base}/search.php?s=${meal}`;
          const response = await axios.get(apiURL);
          
          return response.data;
     }
     catch (error){
          console.error(error);
     }
}

// www.themealdb.com/api/json/v1/1/lookup.php?i=52772
export async function getRecipe (mealId){
     try{
          const apiURL = `${base}/lookup.php?i=${mealId}`;
          const response = await axios.get(apiURL);
          
          return response.data;
     }
     catch (error){
          console.error(error);
     }
}