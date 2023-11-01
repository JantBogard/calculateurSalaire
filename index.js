class Person {
  nom;
  prenom;
  age;
  sexe;
  salaireBrut;
  salaireNet;
  nbreCharge;
}

const ALLOCATION = 150;
const BONUS = 100;
const IMPOT = 0.18;
const ASSURANCE = 0.07;
const PENSION = 0.05;

var inputs = document.querySelectorAll("input");
var select = document.querySelector("select");
var btn = document.querySelector("#btn");
var btnSave = document.querySelector("#save");
var affiche = document.querySelector("#Affiche");
var person = new Person();

var save = () => {
  person.nom = inputs[0].value;
  person.prenom = inputs[1].value;
  person.age = inputs[2].value;
  person.sexe = select.value;
  person.salaireBrut = inputs[3].value;
  person.nbreCharge = inputs[4].value;
  affiche.innerHTML =
    "<p>Nom: " +
    person.nom +
    "</p><p>Prenom: " +
    person.prenom +
    "</p><p>Age: " +
    person.age +
    "</p><p>Sexe: " +
    person.sexe +
    "</p><p>Salaire Brut: " +
    person.salaireBrut +
    "$</p><p>Nombre de charge: " +
    person.nbreCharge +
    "</p>";
};

var calcul = () => {
  var reductImpot = 0;
  const ADDONS = checkBonus();

  if (person.sexe === "Femme") {
    reductImpot += 2;
  }
  if (person.nbreCharge === 3) {
    reductImpot += 1;
  } else if (person.nbreCharge >= 4) {
    reductImpot += 2;
  }

  person.salaireNet =
    person.salaireBrut -
    person.salaireBrut * (IMPOT - reductImpot / 100) -
    person.salaireBrut * ASSURANCE -
    person.salaireBrut * PENSION;
  person.salaireNet += ADDONS;

  addElement("Impot: " + IMPOT * 100 + "%");

  addElement("Reduction Impot: " + reductImpot + "%");

  addElement("Assurance employé: " + parseInt(ASSURANCE * 100) + "%");

  addElement("Régime de pensions du Canada: " + PENSION * 100 + "%");

  addElement("Bonus ou Allocation: " + ADDONS);

  addElement("Salaire Net: " + person.salaireNet);
};

var addElement = (text) => {
  var p = document.createElement("p");
  p.innerText = text;
  affiche.appendChild(p);
};

var checkBonus = () => {
  const bonus = [0, BONUS, ALLOCATION];
  var index = getRandomArbitrary(0, 3);
  return bonus[index];
};

btnSave.addEventListener("click", save);
btn.addEventListener("click", calcul);

function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}
