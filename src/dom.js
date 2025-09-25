const tbodyUpper = document.getElementById("upper");
const trUpperSubTotal = tbodyUpper.querySelector(".sub-total");

const tbodyLower = document.getElementById("lower");
const trLowerTotal = tbodyLower.querySelector(".section-total");

const formTrack = document.getElementById("track");
const divDice = document.getElementById("dice");
const pRollsCount = document.getElementById("rolls-count");
const formTrackSubmit = formTrack.querySelector("input[type='submit']");

const combinationToTr = (combination) => {
	const tr = document.createElement("tr");
	tr.id = combination.id;

	const th = document.createElement("th");
	th.setAttribute("scope", "row");
	th.textContent = combination.name;
	tr.appendChild(th);

	const tdValue = document.createElement("td");
	tdValue.className = "value";
	tr.appendChild(tdValue);

	return tr;
};

const renderScoreboard = () => {
	UpperCombinations.forEach((combination) => {
		tbodyUpper.insertBefore(combinationToTr(combination), trUpperSubTotal);
	});

	LowerCombinations.forEach((combination) => {
		tbodyLower.insertBefore(combinationToTr(combination), trLowerTotal);
	});
};

const renderDie = (index, die) => {
	const buttonDie = divDice.children[index];
	buttonDie.removeAttribute("disabled");
	buttonDie.ariaLabel = die.locked ? "Déverrouiller ce dé" : "Verrouiller ce dé";
	buttonDie.classList.toggle("locked", die.locked);

	const imgDie = buttonDie.firstElementChild;
	imgDie.setAttribute("src", `assets/images/d8_${die.value}.png`);
	imgDie.setAttribute("alt", die.value);
};

const renderDice = (diceState) => {
	diceState.forEach((die, i) => renderDie(i, die));
};

const initDiceEvents = (onDieClick) => {
	for (let i = 0; i < divDice.children.length; i++) {
		divDice.children[i].addEventListener("click", () => onDieClick(i));
	}
};

const renderCurrentRollsCount = (currentRollIndex, maxRollsCount) => {
	pRollsCount.querySelector(".current").textContent = currentRollIndex ?? "-";

	if (currentRollIndex >= maxRollsCount) {
		for (let i = 0; i < divDice.children.length; i++) {
			divDice.children[i].setAttribute("disabled", "");
		}

		formTrackSubmit.setAttribute("disabled", "");
	}
};

const renderTrack = (maxRollsCount, onDieClick, onSubmit) => {
	initDiceEvents(onDieClick);

	renderCurrentRollsCount();
	pRollsCount.querySelector(".total").textContent = maxRollsCount;

	formTrack.addEventListener("submit", onSubmit);
};
