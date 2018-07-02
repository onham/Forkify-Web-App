export default class Likes {
	constructor(){
		this.likes = [];
	}

	addLike(id, title, author, img){
		const like = {
			id,
			title,
			author,
			img
		};
		this.likes.push(like);

		//persist the data in local storage
		this.persistData();

		return like;
	}

	deleteLike(id){
		const index = this.likes.findIndex(el => el.id === id);
		this.likes.splice(index, 1);

		//persist data in local storage
		this.persistData();
	}

	isLiked(id){
		return this.likes.findIndex(el => el.id === id) !== -1; 
		//!==-1 - we are testing to see if this is different than -1 , if we can't find any item with the id we passed in then it will be equal to -1 aka false
	}

	getNumLikes(){
		return this.likes.length;
	}

	persistData(){
		localStorage.setItem('likes', JSON.stringify(this.likes));
	}

	readStorage(){
		const storage = JSON.parse(localStorage.getItem('likes'));

		// we are basically restoring likes from the local storage
		if (storage) {
			this.likes = storage;
		}
	}
}