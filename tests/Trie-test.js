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

	// it('should be able to insert a new word into the Trie', () => {
	// 	var completion = new Trie();
	// 	completion.insert('pizza');
	// 	completion.insert('piece');
	// console.log(JSON.stringify(completion, null, 2))

	// })

	it('should increment the word count when a word is added', () => {
		var completion = new Trie();
		expect(completion.count).to.equal(0);
		completion.insert('pizza');
		expect(completion.count).to.equal(1);
		completion.insert('piece');
		expect(completion.count).to.equal(2);
	})

	it('should suggest completed words when given letters', () => {
		var completion = new Trie();
		completion.insert('pizza');
		completion.insert('pizzazz');
		// console.log(JSON.stringify(completion, null, 2))
		expect(completion.suggest('piz')).to.deep.equal(['pizza', 'pizzazz']);
	})

	it('should contain 235,886 words after populating with the dictionary', () => {
    var completion = new Trie();
  	completion.populate(dictionary);
  	expect(completion.count).to.equal(235886);
  });

	it('should return an empty array if there are no suggestions', () => {
    var completion = new Trie();
  	completion.populate(dictionary);
  	expect(completion.suggest('childhood')).to.deep.equal([]);
  	// console.log(completion.suggest('childhood'));
		// expect(completion.suggest('piz')).to.deep.equal(['pizza', 'pizzazz']);
  });

  it('should return a large array of suggestions if common letters are entered', () => {
  	var completion = new Trie();
  	completion.populate(dictionary);
  	expect(completion.suggest('ch').length).to.equal(2527);
  })

  it('should prioritize suggestions based on previous selections', () => {
  	var completion = new Trie();
  	completion.insert('pizza');
  	completion.insert('pizzeria');
  	completion.insert('pizzazz');
		expect(completion.suggest('piz')).to.deep.equal(['pizza', 'pizzazz', 'pizzeria']);
		completion.select('pizzeria');
		expect(completion.suggest('piz')).to.deep.equal(['pizzeria', 'pizza', 'pizzazz']);
  })

})








