export const elements = {
	searchForm: document.querySelector('.search'),
	searchInput: document.querySelector('.search__field'),
	searchResList: document.querySelector('.results__list'),
	searchRes: document.querySelector('.results'),
	searchPages: document.querySelector('.results__pages'),
	recipe: document.querySelector('.recipe'),
	shopping: document.querySelector('.shopping__list'),
	likesMenu: document.querySelector('.likes__field'),
	likesList: document.querySelector('.likes__list')
}

// a seperate shortcut for our loader since we can't put it in the above elements as it has not even loaded yet
export const elementStrings = {
	loader: 'loader'
}


//the spinning loader::
export const renderLoader = parent => {
	const loader = `
		<div class="${elementStrings.loader}"">
			<svg>
				<use href='img/icons.svg#icon-cw'></use>
			</svg>
		</div>
	`;
	parent.insertAdjacentHTML('afterbegin', loader);
}


//func to remove loader
export const clearLoader = () => {
	const loader = document.querySelector(`.${elementStrings.loader}`);
	if (loader) {
		loader.parentElement.removeChild(loader);
	}
}