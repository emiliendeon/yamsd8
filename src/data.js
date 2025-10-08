const UpperCombinations = [
	{
		id: "aces",
		name: "As",
		computeScore: (sortedValuesOccurrencesCounts) =>
			computeUpperCombinationScore(1)(sortedValuesOccurrencesCounts),
	},
	{
		id: "twos",
		name: "Deux",
		computeScore: (sortedValuesOccurrencesCounts) =>
			computeUpperCombinationScore(2)(sortedValuesOccurrencesCounts),
	},
	{
		id: "threes",
		name: "Trois",
		computeScore: (sortedValuesOccurrencesCounts) =>
			computeUpperCombinationScore(3)(sortedValuesOccurrencesCounts),
	},
	{
		id: "fours",
		name: "Quatre",
		computeScore: (sortedValuesOccurrencesCounts) =>
			computeUpperCombinationScore(4)(sortedValuesOccurrencesCounts),
	},
	{
		id: "fives",
		name: "Cinq",
		computeScore: (sortedValuesOccurrencesCounts) =>
			computeUpperCombinationScore(5)(sortedValuesOccurrencesCounts),
	},
	{
		id: "sixes",
		name: "Six",
		computeScore: (sortedValuesOccurrencesCounts) =>
			computeUpperCombinationScore(6)(sortedValuesOccurrencesCounts),
	},
	{
		id: "sevens",
		name: "Sept",
		computeScore: (sortedValuesOccurrencesCounts) =>
			computeUpperCombinationScore(7)(sortedValuesOccurrencesCounts),
	},
	{
		id: "eights",
		name: "Huit",
		computeScore: (sortedValuesOccurrencesCounts) =>
			computeUpperCombinationScore(8)(sortedValuesOccurrencesCounts),
	},
];

const LowerCombinations = [
	{
		id: "three-of-a-kind",
		name: "Brelan",
		validate: (sortedValuesOccurrencesCounts) =>
			sortedValuesOccurrencesCounts.some(([, x]) => x >= 3),
		computeScore: (sortedValuesOccurrencesCounts) =>
			sumWeightedValues(sortedValuesOccurrencesCounts),
	},
	{
		id: "four-of-a-kind",
		name: "Carré",
		validate: (sortedValuesOccurrencesCounts) =>
			sortedValuesOccurrencesCounts.some(([, x]) => x >= 4),
		computeScore: (sortedValuesOccurrencesCounts) =>
			sumWeightedValues(sortedValuesOccurrencesCounts),
	},
	{
		id: "full",
		name: "Full",
		validate: (sortedValuesOccurrencesCounts) =>
			sortedValuesOccurrencesCounts.every(([, x]) => [2, 3].includes(x)),
		baseScore: 35,
	},
	{
		id: "small-straight",
		name: "Petite suite",
		validate: (sortedValuesOccurrencesCounts) =>
			validateSequence(4)(sortedValuesOccurrencesCounts),
		baseScore: 40,
	},
	{
		id: "large-straight",
		name: "Grande suite",
		validate: (sortedValuesOccurrencesCounts) =>
			validateSequence(5)(sortedValuesOccurrencesCounts),
		baseScore: 50,
	},
	{
		id: "yams",
		name: "Yams",
		validate: (sortedValuesOccurrencesCounts) => sortedValuesOccurrencesCounts[0][1] === 5,
		baseScore: 70,
	},
	{
		id: "chance",
		name: "Chance",
		computeScore: (sortedValuesOccurrencesCounts) =>
			sumWeightedValues(sortedValuesOccurrencesCounts),
	},
];

const Combinations = [...UpperCombinations, ...LowerCombinations];

const BONUS_THRESHOLD = 108;
const BONUS_VALUE = 45;

const MAX_ROLLS_COUNT = 4;
