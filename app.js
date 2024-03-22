// the file for our application logic (aka logic to play 5 card poker)

import * as api from './api.js';

// prints the meal information in a user friendly manner.
function _prettyPrint (meals){
    /* for each meal in meals...
       display the name of the meal
       display the unique id of the meal
       display the ingredients of the meal
        iterate through the 1 - 20 
        if the ingredienti is exists; display it and the measurements
        else break
       display the instructions of the meal  
    */
    meals.forEach(meal =>{
        console.log('= = = = = = = = = = = = = = = = = = = = = =\n');
        console.log(`Recipe: ${meal.strMeal}`)
        console.log(`Meal ID: ${meal.idMeal}\n`)
        console.log(`Ingredient:`)
        for(let i = 1; i < 20 + 1; i++){
            if(meal[`strIngredient${i}`]){
                console.log(`${meal[`strIngredient${i}`].padEnd(20)}\t\t${meal[`strMeasure${i}`]}`);
            }
            else{
                break;
            }        
        }
        console.log(`\nInstructions:\n${meal.strInstructions}`)
    });
    console.log('= = = = = = = = = = = = = = = = = = = = = =');
    
}

export async function cookRecipe() {
    try{
           
        // get a recipe
        const mealQuery = await api.getMealQuery("rice");
        _prettyPrint(mealQuery.meals);
    }
    catch(error){
        console.log(error);
    }
}
cookRecipe();
