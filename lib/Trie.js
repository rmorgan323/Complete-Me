import { Node } from './Node.js';

export class Trie {
	constructor() {
		this.root = new Node('');
		this.count = 0;
		// this.suggestions = [];
		// this.suggestionObjects = {};
	}

	insert(word) { 
		this.count++
		word = word.split('');

		let position = this.root.children;
		let parent = this.root;

		for (let i = 0; i < word.length; i++) {
			if (position.hasOwnProperty(word[i])) {
				position = position[word[i]].children;
				parent = parent.children[word[i]]
			} else {
				position[word[i]] = new Node(word[i])
				position = position[word[i]].children;
				parent = parent.children[word[i]]
			}
		}
		parent.wordEnd = true;
	}

	suggest(phrase) {
		phrase = phrase.split('');

		let currentNode = this.root;
		phrase.forEach(letter => {
			currentNode = currentNode.children[letter];
			if(currentNode === null) {
				return null;
			}
		})
		return this.findSuggestions(currentNode, phrase.join(''))
	}

	findSuggestions(currentNode, phrase) {
		let childrenLetters = Object.keys(currentNode.children);
		let suggestions = [];

		childrenLetters.forEach(childLetter => {
			let letterNode = currentNode.children[childLetter];
			let newPhrase = phrase + childLetter;

			if(letterNode.children === {}) {
				suggestions.push(newPhrase);
			} else if (letterNode.wordEnd) {
				suggestions.push(newPhrase);
				suggestions.push(...this.findSuggestions(letterNode, newPhrase));
			} else {
				suggestions.push(...this.findSuggestions(letterNode, newPhrase));
			}
		})
		return suggestions;
	}























	// suggest(phrase) {
	// 	this.suggestions = [];
	// 	this.suggestionObjects = [];

	// 	let cancel = false;
	// 	let phraseArray = phrase.trim().split('');
	// 	let position = this.root;

	// 	phraseArray.forEach(letter => {
	// 		if (position['children'][letter] === undefined) {
	// 			cancel = true;
	// 			return cancel;
	// 		}
	// 		position = position.children[letter];
	// 	})
	// 	if (cancel === true) {
	// 		return [];
	// 	}
	// 	this.findSuggestion(position, phrase);
	// 	this.suggestionObjects.sort((a,b) => {
	// 		return b.count = a.count;
	// 	})
	// 	Object.keys(this.suggestionObjects).forEach(suggestion => {
	// 		this.suggestions.push(this.suggestionObjects[suggestion].word);
	// 	})
	// 	return this.suggestions;
	// }

 // 	findSuggestion(position, phrase) {
 // 		Object.keys(position['children']).forEach(node => {
 // 			if (Object.keys(position['children'][node]['children']).length === 0) {
 // 				this.suggestionObjects.push({word: (phrase + node), count: (position['children'][node]['chosenCount']), recency: (position['children'][node]['lastChosen'])});
 // 			} else if (position['children'][node].wordEnd) {
 // 				this.suggestionObjects.push({word: (phrase + node), count: (position['children'][node]['chosenCount']), recency: (position['children'][node]['lastChosen'])});
 // 				return this.findSuggestion.call(this, position['children'][node], (phrase + node));
 // 			} else {
 // 				return this.findSuggestion.call(this, position['children'][node], (phrase + node));
 // 			}
 // 		})
 // 	}



	// toArray() {
 //  	return this.toArrayHelper(this.root)
 //  }

 //  toArrayHelper(node) {
 //  	if (!node) {
 //  		return [];
	//  	}
	//  	return [
	//  		...this.toArrayHelper(node.left), 
	//  		node.data, 
	//  		...this.toArrayHelper(node.right)
	//  	]
 //  }

	populate(wordList) {
		wordList.forEach(word => {
			this.insert(word);
		})
	}

	count() {
		return this.count;
	}

	select() {
		
	}

}


