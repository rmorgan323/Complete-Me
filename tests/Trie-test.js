import { expect } from 'chai';
import index from '../lib/index';
import { Trie } from '../lib/Trie.js';

describe('Trie', () => {
	it('should be able to instantiate a Trie', () => {
		var completion = new Trie();
		expect(completion).to.be.an('object');
	})

	it('should be able to insert a new word into the Trie', () => {
		var completion = new Trie();
		completion.insert('pizza');
		// console.log(splitWord)
	})

	it.skip('should increment the word count when a word is added', () => {

	})
})