const UpperCombinations = [
	{
		id: "aces",
		name: "As",
	},
	{
		id: "twos",
		name: "Deux",
	},
	{
		id: "threes",
		name: "Trois",
	},
	{
		id: "fours",
		name: "Quatre",
	},
	{
		id: "fives",
		name: "Cinq",
	},
	{
		id: "sixes",
		name: "Six",
	},
	{
		id: "sevens",
		name: "Sept",
	},
	{
		id: "eights",
		name: "Huit",
	},
];

const LowerCombinations = [
	{
		id: "three-of-a-kind",
		name: "Brelan",
	},
	{
		id: "four-of-a-kind",
		name: "Carré",
	},
	{
		id: "full",
		name: "Full",
	},
	{
		id: "small-straight",
		name: "Petite suite",
	},
	{
		id: "large-straight",
		name: "Grande suite",
	},
	{
		id: "yams",
		name: "Yams",
	},
	{
		id: "chance",
		name: "Chance",
	},
];

const Combinations = [...UpperCombinations, ...LowerCombinations];
