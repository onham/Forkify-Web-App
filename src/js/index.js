// NOTES ON IMPORTING/EXPORTING::
// import quanny from './models/Search.js' //the './' refers to the current file location
// const x = 23;
// console.log (`I imported ${quanny} from Search.js! variable x is ${x}`);


// // one way to import functions:
// // import {add as a, multiply as m} from './views/searchView.js'  


// //another way is to import everything in the file:

// import * as searchView from './views/searchView'

// console.log(`using add and multiply we get the results of ${searchView.add(2,6)} and ${searchView.multiply(3,5)}`);











// GLOBAL APP CONTROLLER

//our forkify api key:
//abd7bf80d8e5b5fbf3f6d5e407a176b2 

// search url:
// http://food2fork.com/api/search


import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base'; //curly braces required since its a single element
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';

// GLOBAL STATE OF THE APP:
// search object
// current recipe object
// shopping list object
// liked recipes
const state = {}
console.log(state);









// **********
// SEARCH CONTROLLER::
// **********

const controlSearch = async () => {
	//1. get query from view
	const query = searchView.getInput();
	console.log(query);

	if (query) {
		//2. new search object and add to state
		state.search = new Search(query);

		//3. prepare UI for results
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes);

		try {
			//4. search for recipes
			await state.search.getResults();

			//5. render results on UI
			clearLoader();
			searchView.renderResults(state.search.result);
			console.log(state.search.result);
		} catch(error) {
			console.log(error);
			alert('Something went wrong :(');
		}
	}
}

elements.searchForm.addEventListener('submit', event => {
	event.preventDefault(); //event object . preventDefault prevents page from reloading on submission
	controlSearch();
});

elements.searchPages.addEventListener('click', event => {
	const btn = event.target.closest('.btn-inline'); //closest gets the nearest element with the '.btn-inline' class
	if (btn) { //if there is a button, then read the goto page
		const goToPage = parseInt(btn.dataset.goto, 10); //10 is to indicate base10
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);
	}
});









// **********
// RECIPE CONTROLLER::
// **********

const controlRecipe = async () => {
	const id = window.location.hash.replace('#', ''); 
	// 'window.location' refers to the entire url
	// since the url is a string we can use string methods on it such as '.replace'
	// replacing hash with nothing
	if (id) {
		// prepare ui for changes
		// create new recipe object
		state.recipe = new Recipe(id);
		recipeView.clearRecipe();
		renderLoader(elements.recipe);
		if (state.search){
			searchView.highlightSelected(id);
		}
		// get recipe data
		try {
			await state.recipe.getRecipe();
			state.recipe.parseIngredients();
			// call functions created for time and servings
			state.recipe.calcTime();
			state.recipe.calcServings();
			clearLoader();
			// render recipe
			console.log(state.recipe);
			recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
		} catch(error) {
			console.log(error);
			alert('Something went wrong :(');
		}
	}
}









// **********
// LIST CONTROLLER::
// **********

const controlList = () => {
	//create a new list if there is none yet
	if (!state.list){
		state.list = new List();
	}

	// add each ingredient to the list
	state.recipe.ingredients.forEach(el => {
		const item = state.list.addItem(el.count, el.unit, el.ingredient);
		listView.renderItem(item);
	});
	console.log(state.list);
}

// handling delete and update list item events::
elements.shopping.addEventListener('click', e => {
	const id = e.target.closest('.shopping__item').dataset.itemid

	//delete items
	if (e.target.matches('.shopping__delete, .shopping__delete *')){
		//delete from state:
		state.list.deleteItem(id);
		//delete from ui:
		listView.deleteItem(id);
	//handle the count update:	
	} else if (e.target.matches('.shopping__count-value')){
		const val = parseFloat(e.target.value, 10);
		state.list.updateCount(id, val);
	}
});












// **********
// LIKES CONTROLLER::
// **********

const controlLike = () => {
	const currentID = state.recipe.id;
	if (!state.likes){
		state.likes = new Likes();
	}

	// user has NOT yet liked current recipe
	if (!state.likes.isLiked(currentID)){
		// add like to the state
		const newLike = state.likes.addLike(
				currentID,
				state.recipe.title,
				state.recipe.author,
				state.recipe.img
			);
		// toggle the like button
		likesView.toggleLikeBtn(true);
		// add like to UI list
		likesView.renderLike(newLike);

	// user HAS liked current recipe	
	} else {
		// remove like from the state
		state.likes.deleteLike(currentID);
		// untoggle the like button
		likesView.toggleLikeBtn(false);
		// remove like from UI list
		likesView.deleteLike(currentID);
	}
	likesView.toggleLikeMenu(state.likes.getNumLikes());
};


// restore liked recipes on page load
window.addEventListener('load', () => {
	state.likes = new Likes();
	//restoring our likes
	state.likes.readStorage();
	//toggle the heart button up top
	likesView.toggleLikeMenu(state.likes.getNumLikes());
	//render the existing likes
	state.likes.likes.forEach(like => likesView.renderLike(like));
});






// // listening for changes in the hash of the url
// window.addEventListener('hashchange', controlRecipe);
// // when we reload the page with the hash on it will still show that recipe
// window.addEventListener('load', controlRecipe);

// shorter way:::
// using an array and the forEach method to listen for two events for the same function
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


//clicking on the servings +/-::
elements.recipe.addEventListener('click', event => {   //listening to the entire recipe element for clicks
	if (event.target.matches('.btn-decrease, .btn-decrease *')){ //if what we click on matches the button or any child of that button
		state.recipe.updateServings('dec');
		recipeView.updateServingsIngredients(state.recipe);
	} else if (event.target.matches('.btn-increase, .btn-increase *')){
		state.recipe.updateServings('inc');
		recipeView.updateServingsIngredients(state.recipe);
	} else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')){
		controlList();
	} else if (event.target.matches('.recipe__love, .recipe__love *')){
		controlLike();
	}
});




