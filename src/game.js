const initGame = () => {
	UpperCombinations.forEach((combination) => {
		tbodyUpper.insertBefore(combinationToTr(combination), trUpperSubTotal);
	});

	LowerCombinations.forEach((combination) => {
		tbodyLower.insertBefore(combinationToTr(combination), trLowerTotal);
	});
};

initGame();
