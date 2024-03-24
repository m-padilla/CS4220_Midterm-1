// the file for our application logic (aka logic to play 5 card poker)

import * as api from './api.js';
import { select } from '@inquirer/prompts';
import * as db from "./db.js"


// prints the meal information in a user friendly manner.
function _prettyPrint(meals) {
    /* for each meal in meals...
       display the name of the meal
       display the unique id of the meal
       display the ingredients of the meal
        iterate through the 1 - 20 
        if the ingredienti is exists; display it and the measurements
        else break
       display the instructions of the meal  
    */
    meals.forEach((meal) => {
        console.log('= = = = = = = = = = = = = = = = = = = = = =\n');
        console.log(`Recipe: ${meal.strMeal}`);
        console.log(`Meal ID: ${meal.idMeal}\n`);
        console.log('Ingredient:');
        for (let i = 1; i < 20 + 1; i++) {
            if (meal[`strIngredient${i}`]) {
                console.log(`${meal[`strIngredient${i}`].padEnd(20)}\t\t${meal[`strMeasure${i}`]}`);
            } 
            else {
                break;
            }
        }
        console.log(`\nInstructions:\n${meal.strInstructions}`);
    });
    console.log('= = = = = = = = = = = = = = = = = = = = = =');
}

async function _recipePrompt ( meals ) {
    const displayMeals = meals.map((meal) => {
        return{name : `${meal.strMeal}`, value: meal.idMeal};
    });

    return await select({
        message: 'Select a meal to view',
        choices: displayMeals
    });

};


export async function cookRecipe(type, variable) {
    try {
        // get a recipe
        if (type === 'name') {
            const mealQuery = await api.searchByName(variable);
            if (mealQuery.meals === null){
                throw new Error(`Sorry we don't have recipe names ${variable}.`);
            }
            const selectedMeal = await _recipePrompt(mealQuery.meals);
            const displaySelectedMeal = await api.searchById(selectedMeal);
            _prettyPrint(displaySelectedMeal.meals);

           historyEntry(variable, mealQuery.meals.length);

        } 
        if (type === 'firstLetter') {
            const mealQuery = await api.searchByFirstLetter(variable);
            if (mealQuery.meals === null){
                throw new Error(`Sorry we don't have recipe with first letter ${variable}.`);
            }
            const selectedMeal = await _recipePrompt(mealQuery.meals);
            const displaySelectedMeal = await api.searchById(selectedMeal);
            _prettyPrint(displaySelectedMeal.meals);

            historyEntry(variable, mealQuery.meals.length);
        }
        else  {
            const mealQuery = await api.searchById(variable);
            if (mealQuery.meals === null){
                throw new Error(`Sorry we don't have recipe with id ${variable}.`);
            }
            _prettyPrint(mealQuery.meals);

            historyEntry(variable, mealQuery.meals.length);
        }
        
    } catch (error) {
        console.log(error.message);
    }
}

async function historyEntry( mealEntry, numOfMeal ){
    const entry = {
        id: 'whatever',
        search: mealEntry,
        resultCount: numOfMeal
    };
    
    await db.create('search_history', entry);
}

export async function previousRecipes (){
    const recipes = await db.find('search_history');
    const cookedRecipes = recipes.pop();

    console.log('Previously Visited Recipes:');
    console.log(cookedRecipes);
}
