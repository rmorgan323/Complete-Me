import { expect } from 'chai';
import { Trie } from '../lib/Trie.js';

import fs from 'fs';
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('Trie', () => {
	var completion;
	beforeEach(function() {
		completion = new Trie();
	})

	it('should be able to instantiate a Trie', () => {
		expect(completion).to.be.an('object');
	})
})

describe('Insert', () => {
	var completion;
	beforeEach(function() {
		completion = new Trie();
	})

	it('should increment the word count when a word is inserted', () => {
		expect(completion.count).to.equal(0);
		completion.insert('pizza');
		expect(completion.count).to.equal(1);
		completion.insert('piece');
		expect(completion.count).to.equal(2);
	})

	it('should not duplicate words in the Trie', () => {
		expect(completion.count).to.equal(0);
		completion.insert('pizza');
		expect(completion.count).to.equal(1);
		completion.insert('pizza');
		expect(completion.count).to.equal(1);
	})
})

describe('Populate', () => {
	var completion;
	beforeEach(function() {
		completion = new Trie();
	})

	it('should contain 234,371 words after populating with the dictionary', () => {
  	completion.populate(dictionary);
  	expect(completion.count).to.equal(234371);
  });
})

describe('Select', () => {
	var completion;
	beforeEach(function() {
		completion = new Trie();
	})

  it('should increment word influence every time a word is selected', () => {
  	completion.insert('pizza');
  	expect(completion.root.children.p.children.i.children.z.children.z.children.a.popularity).to.equal(0)
  	completion.select('pizza');
  	expect(completion.root.children.p.children.i.children.z.children.z.children.a.popularity).to.equal(1)
  	completion.select('pizza');
  	expect(completion.root.children.p.children.i.children.z.children.z.children.a.popularity).to.equal(2)
  })
})

describe('Suggest', () => {
	var completion;
	beforeEach(function() {
		completion = new Trie();
	})

	it('should suggest completed words when given letters', () => {
		completion.insert('pizza');
		completion.insert('pizzazz');
		completion.insert('apple')
		expect(completion.suggest('piz')).to.deep.equal(['pizza', 'pizzazz']);
		expect(completion.suggest('ap')).to.deep.equal(['apple']);
	})

	it('should return an empty array if there are no suggestions', () => {
  	completion.populate(dictionary);
  	expect(completion.suggest('childhood')).to.deep.equal([]);
  	expect(completion.suggest('cy5dpzx2d8rwjv')).to.deep.equal([]);

  });

	it('should suggest without case-sensitivity', () => {
		completion.insert('pizza');
		completion.insert('pIzZaZz');
		completion.insert('PIZZERIA');
		expect(completion.suggest('piz')).to.deep.equal(['pizza', 'pizzazz', 'pizzeria']);
		expect(completion.suggest('PIZ')).to.deep.equal(['pizza', 'pizzazz', 'pizzeria']);
	})

  it('should return a large array of words when only a few common letters are entered', () => {
  	completion.populate(dictionary);
  	expect(completion.suggest('sen')).to.include.members(['sender', 'senate', 'sense', 'senile']);
  })

  it('should prioritize suggestions based on previous selections', () => {
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

