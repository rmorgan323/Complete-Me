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
})

describe('Insert', () => {
	it('should increment the word count when a word is inserted', () => {
		var completion = new Trie();
		expect(completion.count).to.equal(0);
		completion.insert('pizza');
		expect(completion.count).to.equal(1);
		completion.insert('piece');
		expect(completion.count).to.equal(2);
	})

	it('should not duplicate words in the Trie', () => {
		var completion = new Trie();
		expect(completion.count).to.equal(0);
		completion.insert('pizza');
		expect(completion.count).to.equal(1);
		completion.insert('pizza');
		expect(completion.count).to.equal(1);
	})
})

describe('Populate', () => {
	it('should contain 234,371 words after populating with the dictionary', () => {
    var completion = new Trie();
  	completion.populate(dictionary);
  	expect(completion.count).to.equal(234371);
  });
})

describe('Select', () => {
  it('should increment word influence every time a word is selected', () => {
  	var completion = new Trie();
  	completion.insert('pizza');
  	expect(completion.root.children.p.children.i.children.z.children.z.children.a.popularity).to.equal(0)
  	completion.select('pizza');
  	expect(completion.root.children.p.children.i.children.z.children.z.children.a.popularity).to.equal(1)
  	completion.select('pizza');
  	expect(completion.root.children.p.children.i.children.z.children.z.children.a.popularity).to.equal(2)
  })
})

describe('Suggest', () => {
	it('should suggest completed words when given letters', () => {
		var completion = new Trie();
		completion.insert('pizza');
		completion.insert('pizzazz');
		completion.insert('apple')
		expect(completion.suggest('piz')).to.deep.equal(['pizza', 'pizzazz']);
		expect(completion.suggest('ap')).to.deep.equal(['apple']);
	})

	it('should return an empty array if there are no suggestions', () => {
    var completion = new Trie();
  	completion.populate(dictionary);
  	expect(completion.suggest('childhood')).to.deep.equal([]);
  	expect(completion.suggest('cy5dpzx2d8rwjv')).to.deep.equal([]);

  });

	it('should suggest without case-sensitivity', () => {
		var completion = new Trie();
		completion.insert('pizza');
		completion.insert('pIzZaZz');
		completion.insert('PIZZERIA');
		expect(completion.suggest('piz')).to.deep.equal(['pizza', 'pizzazz', 'pizzeria']);
		expect(completion.suggest('PIZ')).to.deep.equal(['pizza', 'pizzazz', 'pizzeria']);
	})

  it('should return a large array of words when only a few common letters are entered', () => {
  	var completion = new Trie();
  	completion.populate(dictionary);
  	expect(completion.suggest('sen')).to.include.members(['sender', 'senate', 'sense', 'senile']);
  })

  it('should prioritize suggestions based on previous selections', () => {
  	var completion = new Trie();
  	completion.insert('pizza');
  	completion.insert('pizzazz');
  	completion.insert('pizzeria');
		expect(completion.suggest('piz')).to.deep.equal(['pizza', 'pizzazz', 'pizzeria']);
		completion.select('pizzeria');
		expect(completion.suggest('piz')).to.deep.equal(['pizzeria', 'pizza', 'pizzazz' ]);
		completion.select('pizza');
		completion.select('pizza');
		expect(completion.suggest('piz')).to.deep.equal(['pizza', 'pizzeria', 'pizzazz' ]);
  })

})








