const tbodyUpper = document.getElementById("upper");
const tbodyLower = document.getElementById("lower");

const trUpperSubTotal = document.querySelector("#upper tr.sub-total");
const trLowerTotal = document.querySelector("#lower tr.section-total");

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
