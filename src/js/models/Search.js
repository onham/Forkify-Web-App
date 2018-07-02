//our forkify api key:
//abd7bf80d8e5b5fbf3f6d5e407a176b2 

// search url:
// http://food2fork.com/api/search

import axios from 'axios'; //axios package used in place of 'fetch' method
import { proxy, key } from '../config';

export default class Search {
	constructor(query){
		this.query = query;
	}

	async getResults(){
		try {
			const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
			this.result = res.data.recipes;
		} catch(error) {
			alert(error);
		}
	}
}
