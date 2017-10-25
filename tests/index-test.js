import {expect} from 'chai';
import index from '../lib/index';
import {bubbleSort, insertionSort, mergeSort, quickSort} from '@rmorgan323/sorting-suite';

describe('Sort imports', () => {
	it('should successfully use sorts we imported', () => {
		expect(bubbleSort([3,2,1])).to.deep.equal([1,2,3]);
	})
})