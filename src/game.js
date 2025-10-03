const MAX_ROLLS_COUNT = 4;

const gameState = {
	currentRollIndex: 0,
};

let diceState = [];

const resetDiceState = () => {
	diceState = Array.from({ length: 5 }, () => ({ locked: false }));
};

const rollDice = () => {
	for (let i = 0; i < diceState.length; i++) {
		if (!diceState[i].locked) {
			diceState[i].value = Math.floor(Math.random() * 8) + 1;
		}
	}

	gameState.currentRollIndex++;
};

const onDieClick = (index) => {
	if (gameState.currentRollIndex < MAX_ROLLS_COUNT) {
		diceState[index].locked = !diceState[index].locked;

		renderDie(index, diceState[index]);
		toggleTrackSubmit(diceState.some((die) => !die.locked));
	}
};

const validateCombinations = () => {
	const diceValues = diceState.map((die) => die.value);
	const valuesOccurrencesCounts = groupValues(diceValues);
	const sortedValuesOccurrencesCounts = toSortedEntries(valuesOccurrencesCounts, (a, b) => a - b);

	const combinationsScores = {};

	Combinations.forEach((combination) => {
		const isValid = combination.validate?.(sortedValuesOccurrencesCounts) ?? true;

		let score = 0;

		if (isValid) {
			score =
				combination.baseScore ?? combination.computeScore(sortedValuesOccurrencesCounts);
		}

		combinationsScores[combination.id] = score;
	});

	renderScoreboardTrial(combinationsScores);
};

const onTrackSubmit = (e) => {
	e.preventDefault();

	if (gameState.currentRollIndex < MAX_ROLLS_COUNT) {
		rollDice();

		renderDice(diceState);
		renderCurrentRollsCount(gameState.currentRollIndex, MAX_ROLLS_COUNT);

		validateCombinations();
	}
};

const initGame = () => {
	resetDiceState();

	renderScoreboard();
	renderTrack(MAX_ROLLS_COUNT, onDieClick, onTrackSubmit);
};

initGame();
