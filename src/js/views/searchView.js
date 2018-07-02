import { elements } from './base';


//getting text input from search 
export const getInput = () => elements.searchInput.value;


//clearing the search input after submission
export const clearInput = () => {
	elements.searchInput.value = '';
};


//clearing the results list when a new search is made
export const clearResults = () => {
	elements.searchResList.innerHTML = '';
	elements.searchPages.innerHTML = '';
};

//highlighting the selected recipe
export const highlightSelected = id => {
	const resultsArr = Array.from(document.querySelectorAll('.results__link'));
	resultsArr.forEach(el => {
		el.classList.remove('results__link--active');
	})
	document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
};

//a ui fix to limit the title length of the recipe::
export const limitRecipeTitle = (title, limit = 17) => {
	const newTitle = []; //if limit is under, then we are pushing word into a new array
	if (title.length > limit) {
		title.split(' ').reduce((accumulator, current) => { //split turns a title into an array of words
			//reduce has built in accumulator that we will use to count length
			if (accumulator + current.length <= limit) { //testing in each iteration if length of current word is keeping title under limit
				newTitle.push(current); //push the word into our array
			}
			return accumulator + current.length; //return to reduce func the title length
		}, 0); //the zero is the initial value of the accumulator
		return `${newTitle.join(' ')} ...`;
	}
	return title;
}

const renderRecipe = recipe => {
	const markup = `
		<li>
		    <a class="results__link" href="#${recipe.recipe_id}">
		        <figure class="results__fig">
		            <img src="${recipe.image_url}" alt="${recipe.title}">
		        </figure>
		        <div class="results__data">
		            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
		            <p class="results__author">${recipe.publisher}</p>
		        </div>
		    </a>
		</li>
	`;
	elements.searchResList.insertAdjacentHTML('beforeend', markup);
}


//creating the buttons
//type 'prev' or 'next'
const createButton = (page, type) =>
	`
	<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
	    <svg class="search__icon">
	        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
	    </svg>
	    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
	</button>
`;


// rendering back and forth buttons for results list
const renderButtons = (page, numResults, resPerPage) => {
	const pages = Math.ceil(numResults / resPerPage);
	let button;
	if (page === 1) {
		//button to go only next
		button = createButton(page, 'next');
	} else if (page < pages) {
		//both buttons
		button = `
		${createButton(page, 'prev')} 
		${createButton(page, 'next')}
		`;
	} else if (page === pages && pages > 1) {
		//button to go only back
		button = createButton(page, 'prev');
	}
	elements.searchPages.insertAdjacentHTML('afterbegin', button);
};


//display results -> we pass in the recipes, page, and results per page
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
	
	const start = (page - 1) * resPerPage;
	const end = page * resPerPage;
	//execute renderRecipe on each recipe array element
	//slice to return just 10 results
	recipes.slice(start, end).forEach(renderRecipe);

	//render page buttons::
	renderButtons(page, recipes.length, resPerPage);
}
