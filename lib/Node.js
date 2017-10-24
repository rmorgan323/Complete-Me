export class Node {
	constructor(letter, wordEnd) {
		this.letter = letter;
		this.children = {};
		this.wordEnd = wordEnd;
		// this.chosenCount = 0;
		// this.lastChose = 0;
	}
}