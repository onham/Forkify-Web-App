import uniqid from 'uniqid';

export default class List {
	constructor() {
		this.items = [];
	}

	addItem(count, unit, ingredient) {
		const item = {
			id: uniqid(),  //package creates a unique identifier for each entry
			count,
			unit,
			ingredient
		}
		this.items.push(item);
		return item;
	}

	deleteItem(id) {
		const index = this.items.findIndex(el => el.id === id); //finding and returning the index of the element that satisfies the condition
		this.items.splice(index, 1); 
		//takes two arguments: the index we want to start at and the number of entries we want to return - those elements are removed from the array and the original array is mutated
		// the difference between splice and slice::
		// splice - the end number indicates the # of elements to take
		// slice - the end number indicates the index of the element you end at
		// slice does not mutate the original array - returns a new array
	}

	updateCount(id, newCount) {
		this.items.find(el => el.id === id).count = newCount
		//.find returns the item
	}
}