const gameState = {
	currentRollIndex: 0,
};

let scoreboardState = {};
let currentScoreboardTrial = {};

let diceState = [];

const isGameOver = () => Object.keys(scoreboardState).length === Combinations.length;
const isCurrentTrackOver = () => gameState.currentRollIndex >= MAX_ROLLS_COUNT;

const resetGame = () => {
	scoreboardState = {};

	renderScoreboardValues(scoreboardState);
};

const resetTrack = () => {
	gameState.currentRollIndex = 0;
	diceState = Array.from({ length: 5 }, () => ({ locked: false }));

	renderDice(diceState);
	renderCurrentRollsCount(gameState.currentRollIndex, isCurrentTrackOver());
};

const computeScoreboardTotals = (scoreboardState) => {
	const upperSubTotal = UpperCombinations.reduce(
		(a, { id }) => a + (scoreboardState[id] ?? 0),
		0
	);
	const bonus = upperSubTotal >= BONUS_THRESHOLD ? BONUS_VALUE : 0;
	const upperTotal = upperSubTotal + bonus;

	const lowerTotal = LowerCombinations.reduce((a, { id }) => a + (scoreboardState[id] ?? 0), 0);

	const grandTotal = upperTotal + lowerTotal;

	return { upperSubTotal, bonus, upperTotal, lowerTotal, grandTotal };
};

const validateCombinations = () => {
	const diceValues = diceState.map((die) => die.value);
	const valuesOccurrencesCounts = groupValues(diceValues);
	const sortedValuesOccurrencesCounts = toSortedEntries(valuesOccurrencesCounts, (a, b) => a - b);

	currentScoreboardTrial = {};

	Combinations.filter((combination) => scoreboardState[combination.id] === undefined).forEach(
		(combination) => {
			const isValid = combination.validate?.(sortedValuesOccurrencesCounts) ?? true;

			let score = 0;

			if (isValid) {
				score =
					combination.baseScore ??
					combination.computeScore(sortedValuesOccurrencesCounts);
			}

			currentScoreboardTrial[combination.id] = score;
		}
	);

	renderScoreboardTrial(currentScoreboardTrial);
};

const registerCombination = (combinationId) => {
	if (scoreboardState[combinationId] === undefined) {
		resetTrack();

		scoreboardState[combinationId] = currentScoreboardTrial[combinationId];

		renderScoreboardValues({ ...scoreboardState, ...computeScoreboardTotals(scoreboardState) });
	}
};

const rollDice = () => {
	for (let i = 0; i < diceState.length; i++) {
		if (!diceState[i].locked) {
			diceState[i].value = Math.floor(Math.random() * 8) + 1;
		}
	}

	gameState.currentRollIndex++;

	renderDice(diceState, isCurrentTrackOver());
	renderCurrentRollsCount(gameState.currentRollIndex, isCurrentTrackOver());

	validateCombinations();
};

const onDieClick = (index) => {
	if (!isCurrentTrackOver()) {
		diceState[index].locked = !diceState[index].locked;

		renderDie(index, diceState[index]);
		toggleTrackSubmit(diceState.some((die) => !die.locked));
	}
};

const onTrackSubmit = (e) => {
	e.preventDefault();

	if (!isCurrentTrackOver()) {
		if (isGameOver()) {
			resetGame();
		}

		rollDice();
	}
};

const initGame = () => {
	resetTrack();

	renderScoreboard(registerCombination);
	renderTrack(MAX_ROLLS_COUNT, onDieClick, onTrackSubmit);
};

initGame();
