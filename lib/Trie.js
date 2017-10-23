import { Node } from './Node.js';

export class Trie {
	constructor() {
		this.root = new Node('');
		this.count = 0;
	}

	insert(word) { 
		this.count++
		word = word.split('');
		console.log(word)

		let position = this.root.children;
		let parent = this.root;

		while(position.children) {
			if(this.root.children.hasOwnProperty[0]) {
				position = position[0].children;
				word.shift();
			}
		}

		for (let i = 0; i < word.length; i++) {
			position[word[i]] = new Node(word[i])
			position = position[word[i]].children;
			parent = parent.children[word[i]]
		}
		parent.wordEnd = true;
		
	}

	suggest() {

	}

	populate() {

	}

	count() {

	}

	select() {

	}

}


