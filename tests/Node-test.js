import { expect } from 'chai';
import { Node } from '../lib/Node.js';

describe('Node class', () => {
	let newNode;
	beforeEach(function() {
		newNode = new Node('g');
	})

	it('should be able to take in a letter as a node', () => {
		expect(newNode.letter).to.equal('g');
	})

	it('should instantiate with an empty object as children', () => {
		expect(newNode.children).to.deep.equal({});
	})

	it('should instantiate with an initial popularity of 0', () => {
		expect(newNode.popularity).to.equal(0);
	})
})