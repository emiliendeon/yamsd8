const tableScoreboard = document.getElementById("scoreboard");

const tbodyUpper = document.getElementById("upper");
const trUpperSubTotal = tbodyUpper.querySelector(".sub-total");
const tdUpperSubTotalValue = trUpperSubTotal.querySelector(".value");
const thBonus = tbodyUpper.querySelector("#bonus th");
const tdBonusValue = tbodyUpper.querySelector("#bonus .value");
const tdUpperTotalValue = tbodyUpper.querySelector(".section-total .value");

const tbodyLower = document.getElementById("lower");
const trLowerTotal = tbodyLower.querySelector(".section-total");
const tdLowerTotalValue = trLowerTotal.querySelector(".value");

const templateScoreboardRow = document.getElementById("scoreboard-row");

const tdGrandTotalValue = tableScoreboard.querySelector("#grand-total .value");

const formTrack = document.getElementById("track");
const divDice = document.getElementById("dice");
const pRollsCount = document.getElementById("rolls-count");
const formTrackSubmit = formTrack.querySelector("input[type='submit']");

const combinationToScoreboardRow = (combination, onRowClick) => {
	const tr = templateScoreboardRow.content.cloneNode(true).children[0];
	tr.id = combination.id;

	const th = tr.querySelector("th");
	th.textContent = combination.name;

	const buttonSave = tr.querySelector("button.save");
	buttonSave.addEventListener("click", () => onRowClick(combination.id));

	return tr;
};

const renderScoreboard = (onRowClick) => {
	UpperCombinations.forEach((combination) => {
		tbodyUpper.insertBefore(
			combinationToScoreboardRow(combination, onRowClick),
			trUpperSubTotal
		);
	});

	thBonus.textContent = `${thBonus.textContent} (si sous-total \u2a7e ${BONUS_THRESHOLD})`;

	LowerCombinations.forEach((combination) => {
		tbodyLower.insertBefore(combinationToScoreboardRow(combination, onRowClick), trLowerTotal);
	});
};

const renderScoreboardTrial = (scoreboardTrial) => {
	Object.entries(scoreboardTrial).forEach(([combinationId, value]) => {
		const tdValue = tableScoreboard.querySelector(`#${combinationId} .value`);
		tdValue.classList.remove("valid", "invalid");

		if (value > 0) {
			tdValue.classList.add("valid");
		} else {
			tdValue.classList.add("invalid");
		}

		const buttonSave = tdValue.querySelector("button.save");
		buttonSave.removeAttribute("disabled");
		buttonSave.textContent = value;
	});
};

const renderScoreboardValues = (scoreboardState) => {
	Combinations.forEach((combination) => {
		const tdValue = tableScoreboard.querySelector(`#${combination.id} .value`);
		tdValue.classList.remove("valid", "invalid");

		const buttonSave = tdValue.querySelector("button.save");
		buttonSave.setAttribute("disabled", "");
		buttonSave.textContent = scoreboardState[combination.id] ?? null;
	});

	tdUpperSubTotalValue.textContent = scoreboardState.upperSubTotal ?? 0;
	tdBonusValue.textContent = scoreboardState.bonus ?? 0;
	tdUpperTotalValue.textContent = scoreboardState.upperTotal ?? 0;
	tdLowerTotalValue.textContent = scoreboardState.lowerTotal ?? 0;
	tdGrandTotalValue.textContent = scoreboardState.grandTotal ?? 0;
};

const renderDie = (index, die, isCurrentTrackOver = false) => {
	const buttonDie = divDice.children[index];
	buttonDie.toggleAttribute("disabled", die.value === undefined || isCurrentTrackOver);
	buttonDie.classList.toggle("locked", die.locked);
	buttonDie.ariaLabel = die.locked ? "Déverrouiller ce dé" : "Verrouiller ce dé";

	const imgDie = buttonDie.firstElementChild;
	imgDie.setAttribute("src", `assets/images/d8${die.value ? `_${die.value}` : ""}.png`);
	imgDie.setAttribute("alt", die.value ?? "-");
};

const renderDice = (diceState, isCurrentTrackOver) => {
	diceState.forEach((die, i) => renderDie(i, die, isCurrentTrackOver));
};

const initDiceEvents = (onDieClick) => {
	for (let i = 0; i < divDice.children.length; i++) {
		divDice.children[i].addEventListener("click", () => onDieClick(i));
	}
};

const toggleTrackSubmit = (enabled) => {
	if (enabled) {
		formTrackSubmit.removeAttribute("disabled");
	} else {
		formTrackSubmit.setAttribute("disabled", "");
	}
};

const renderCurrentRollsCount = (currentRollIndex, isOver) => {
	pRollsCount.querySelector(".current").textContent = currentRollIndex || "-";

	toggleTrackSubmit(!isOver);
};

const renderTrack = (maxRollsCount, onDieClick, onSubmit) => {
	initDiceEvents(onDieClick);

	renderCurrentRollsCount();
	pRollsCount.querySelector(".total").textContent = maxRollsCount;

	formTrack.addEventListener("submit", onSubmit);
};
