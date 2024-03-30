// The file to interact with the deck of cards api
import axios from 'axios';
import 'dotenv/config';

// base is the most common part of the api url before the it is made dynamic
const base = `https://www.themealdb.com/api/json/v1/${process.env.API_KEY}`;

// www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
export async function searchByName(mealName) {
    try {
        const apiURL = `${base}/search.php?s=${mealName}`;
        const response = await axios.get(apiURL);

        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// www.themealdb.com/api/json/v1/1/lookup.php?i=52772
export async function searchById(mealId) {
    try {
        const apiURL = `${base}/lookup.php?i=${mealId}`;
        const response = await axios.get(apiURL);

        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// www.themealdb.com/api/json/v1/1/search.php?f=a
export async function searchByFirstLetter(mealFL) {
    try {
        const apiURL = `${base}/search.php?f=${mealFL}`;
        const response = await axios.get(apiURL);
        
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// www.themealdb.com/api/json/v1/1/random.php
export async function randomSearch() {
    try {
        const apiURL = `${base}/random.php`;
        const response = await axios.get(apiURL);
        
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
