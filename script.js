// Function for getting a random number 1 and largestNumber
function getRandomNumber(largestNumber) {
  return Math.floor(Math.random() * largestNumber);
}

// amount of character options the player chooses between
const amountOfOptions = 10;

let numberOfGuesses = 0;

// used to grab a random character out of characterIDNumbers and select its image to display
const randomCharacterRecieved = getRandomNumber(amountOfOptions);

// Makes an array of random character ID numbers between 1 and 826 with a length of amountOfOptions
let characterIDNumbers = [];
for (let index = 0; index < amountOfOptions; index++) {
  characterIDNumbers[index] = getRandomNumber(826);
}

// Pull request from the Rick and Morty API for characters based on their ID numbers.
const URL = `https://rickandmortyapi.com/api/character/${characterIDNumbers.join(", ")}`;

console.log(characterIDNumbers)
console.log(randomCharacterRecieved)

// Pulls an array of characterIDNumbers and display a random one based on randomCharacterRecieved
$.ajax(URL).then(function (data) {

  console.log(data)
  $("#characterImage").append(`<img src="${data[randomCharacterRecieved].image}"/>`);
  data.forEach((element) => {$("#characterOption").append(`<option value="${element.name}">${element.name}</option>`);});

  //compares the character name attached to the image to the data selected and lets you know if you guess correctly
  $("#guessSelectionForm").submit(function (event) {
    event.preventDefault();
    if (
      $("#characterOption").find(":selected").text() == data[randomCharacterRecieved].name && numberOfGuesses === 0) {
      numberOfGuesses++;
      $("#confirmationText").text(`${$("#characterOption").find(":selected").text()} is the correct answer! it took you ${numberOfGuesses} guess!`);
    } else if (
      $("#characterOption").find(":selected").text() == data[randomCharacterRecieved].name) {
      numberOfGuesses++;
      $("#confirmationText").text(`${$("#characterOption").find(":selected").text()} is the correct answer! it took you ${numberOfGuesses} tries.`);
    } else {
      $("#confirmationText").text(`${$("#characterOption").find(":selected").text()} is NOT the correct answer!`);
      numberOfGuesses++;
    }
  });

  // removes form after correct guess is made and inputs a play again button
  $("#guessSelectionForm").submit(function (event) {
    event.preventDefault();
    if ($("#characterOption").find(":selected").text() == data[randomCharacterRecieved].name) {
      $("#guessSelectionForm").remove()
      $("#formDiv").append(`<button type="button" id="playAgainButton">Play Again?</button>`)
      $('#playAgainButton').on('click', function(){
        location.reload()
      })
    }});
});