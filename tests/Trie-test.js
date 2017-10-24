import { expect } from 'chai';
import index from '../lib/index';
import { Trie } from '../lib/Trie.js';

import fs from 'fs';
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('Trie', () => {
	it('should be able to instantiate a Trie', () => {
		var completion = new Trie();
		expect(completion).to.be.an('object');
	})

	it('should be able to insert a new word into the Trie', () => {
		var completion = new Trie();
		completion.insert('pizza');
		completion.insert('piece');
		console.log(JSON.stringify(completion, null, 2))
	})

	it('should increment the word count when a word is added', () => {
		var completion = new Trie();
		completion.insert('pizza');
		expect(completion.count).to.equal(1);
		completion.insert('piece');
		expect(completion.count).to.equal(2);
	})

	it('Should have 235,886 items after populating wth the dictionary', function (){
	    var completion = new Trie();
    	completion.populate(dictionary);
    	// console.log(dictionary)
    	expect(completion.count).to.equal(235886);
    // console.log(Object.entries(completeMe.linkedList['children']['c']['children']['h']['children']['i']['children']['l']['children']['d']['children']['w']['children']['a']['children']['r']));
  });
})