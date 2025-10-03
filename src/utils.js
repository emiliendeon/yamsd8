const countValuesOccurrences = (array) => {
	return array.reduce(
		(a, x) => ({
			...a,
			[x]: (a[x] ?? 0) + 1,
		}),
		{}
	);
};

const sumValues = (array) => {
	return array.filter((x) => Number.isFinite(x)).reduce((a, x) => a + x, 0);
};

const sumWeightedValues = (entries) => {
	return entries.reduce((a, [k, v]) => a + k * v, 0);
};

const toSortedEntries = (object, comparator) => {
	return Object.entries(object)
		.map(([k, v]) => [+k, v])
		.sort(comparator);
};

const computeUpperCombinationScore = (target) => (sortedValuesOccurrencesCounts) => {
	return target * (sortedValuesOccurrencesCounts.find(([x]) => x === target)?.[1] ?? 0);
};

const validateSequence = (length) => (sortedValuesOccurrencesCounts) => {
	let currentSequenceLength = 1;

	for (
		let i = 1;
		length - currentSequenceLength <= sortedValuesOccurrencesCounts.length - i &&
		currentSequenceLength < length;
		i++
	) {
		if (sortedValuesOccurrencesCounts[i][0] === sortedValuesOccurrencesCounts[i - 1][0] + 1) {
			currentSequenceLength++;
		} else {
			currentSequenceLength = 0;
		}
	}

	return currentSequenceLength >= length;
};
