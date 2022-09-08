"use strict";

window.addEventListener("DOMContentLoaded", start);


// The prototype for all animals: 
const Animal = {
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0
};
 let allAnimals;

function start( ) {
    console.log("ready");

    // TODO: Add event-listeners to filter and sort buttons
    document.querySelector("[data-filter=dog]").addEventListener("click", dogFilterBtn);
    document.querySelector("[data-filter=cat]").addEventListener("click", catFilterBtn);
    document.querySelector("[data-filter=all]").addEventListener("click", allFilterBtn);
    
    loadJSON();
}
 function dogFilterBtn(){
    const allDogs = allAnimals.filter(isDog);
    displayList(allDogs);
 }
 function catFilterBtn() {
   const allCats = allAnimals.filter(isCat);
   displayList(allCats);
 }
function allFilterBtn(){
    console.log("all animals filter button cliked ");
    displayList(allAnimals);
}
async function loadJSON() {
    const response = await fetch("animals.json");
    const jsonData = await response.json();
    
    // when loaded, prepare data objects
    prepareObjects( jsonData );
}

function prepareObjects( jsonData ) {
    allAnimals = jsonData.map( preapareObject );

    // TODO: This might not be the function we want to call first
    displayList(allAnimals);
}

function preapareObject( jsonObject ) {
    const animal = Object.create(Animal);
    
    const texts = jsonObject.fullname.split(" ");
    animal.name = texts[0];
    animal.desc = texts[2];
    animal.type = texts[3];
    animal.age = jsonObject.age;

    return animal;
}


function displayList(animals) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";
    // build a new list
    animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);
    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;
    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}

function isCat(animal) {
  console.log("Cat clicked");

  if (animal.type == "cat") {
    return true;
  }
  return false;
}

function isDog(animal) {
  console.log("Dog clicked");

  if (animal.type == "dog") {
    return true;
  }
  return false;
}

