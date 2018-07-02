import axios from 'axios';
import { key, proxy } from '../config'

export default class Recipe {
	constructor(id) {
		this.id = id;
	}

	async getRecipe() {
		try {
			const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
			this.title = res.data.recipe.title;
			this.author = res.data.recipe.publisher;
			this.img = res.data.recipe.image_url;
			this.url = res.data.recipe.source_url;
			this.ingredients = res.data.recipe.ingredients;
		} catch(error) {
			console.log(error);
			alert('Something went wrong :(');
		}
	}

	calcTime() {
		const numIng = this.ingredients.length;
		const periods = Math.ceil(numIng / 3);
		this.time = periods * 15; // assuming every three ingredients we need 15 minutes
	}

	calcServings() {
		this.servings = 4; // let's just say 4
	}

	parseIngredients() {
		
		const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'cup', 'pounds', 'grams']; //loop through this array and replace with the shorter alternatives
		const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'cup', 'pound', 'g'];
		const units = [...unitsShort, 'kg', 'g', 'ml'];


		const newIngredients = this.ingredients.map(el => {  //reformatting our ingredients into a new array
			//1. uniform units
			let ingredient = el.toLowerCase();
			unitsLong.forEach((unit, i) => {
				ingredient = ingredient.replace(unit, unitsShort[i]);
			});
			//2. remove parentheses
			ingredient = ingredient.replace(/ *\([^)]*\) */g, ''); //this is a regular expression
			//3. parse ingredients into count, unit, and ingredient

			//first we are going to test if there is a unit in the string and where is it located
			const arrIng = ingredient.split(' '); // splitting the ingredient up word by word into an array
			const unitIndex = arrIng.findIndex(el2 => units.includes(el2)); //'.includes' checks the array for the element and returns true or false
			//'.findIndex' returns index of where unit was found in array
			
			let objIng; //our ingredient object

			if (unitIndex > -1) { //that there is a unit
				const arrCount = arrIng.slice(0, unitIndex);
				let count;
				if (arrCount.length === 1) {
					count = eval(arrIng[0].replace('-', '+')); //replacing any dashes with pluses and then using .eval to do the math
				} else {
					count = eval(arrIng.slice(0, unitIndex).join('+'));  // '.eval' evaluates the math in the string
				}
				objIng = {
					count,
					unit: arrIng[unitIndex],
					ingredient: arrIng.slice(unitIndex+1).join(' ')
				};
			} else if (parseInt(arrIng[0], 10)){ //there is no unit but the first entry is a number, again the 10 is to indicate base10
				objIng ={
					count: parseInt(arrIng[0], 10),
					unit: '',
					ingredient: arrIng.slice(1).join(' ')
				};
			} else if (unitIndex === -1) { //there is no unit or number in first entry
				objIng = {
					count: 1,
					unit: '',
					ingredient //ingredient property is the ingredient variable we have here
				};
			}
			return objIng;
		});
		this.ingredients = newIngredients;
	}

	updateServings(type) {
		//servings - pressing the increase or decrease button
		const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

		//updating # of ingredients accordingly
		this.ingredients.forEach(ing => {
			ing.count *= (newServings / this.servings);
		});

		this.servings = newServings;
	}
}