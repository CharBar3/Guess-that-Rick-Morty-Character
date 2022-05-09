// if ($) {
//   console.log("jQuery Activated!");
// }

// pull 10 random characters from rick and morty API
// https://rickandmortyapi.com/api/character/1,183 (example characterOneNumber, characterTwoNumber, ...)

// making the character one id number be a random number between 1 and 826(the total number of rick and morty characters)
// Inspiration below
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor

function getRandomCharacterID() {
  return Math.floor(Math.random() * 826);
}

// gets a random number between between 0 and the largest amount of options available 
function getRandomCharacter() {
    return Math.floor(Math.random() * amountOfOptions);
  }

// put numbers in an array

let characterIDNumbers = [];

// will eventually get input from the user for how many options they want to choose from
const amountOfOptions = 10;

// variable to count the amount of guesses it took to get the correct one
let numberOfGuesses = 0; 

// variable to pick a character from the recieved data at random
const randomCharacterRecieved = getRandomCharacter()

for (let index = 0; index < amountOfOptions; index++) {
  characterIDNumbers[index] = getRandomCharacterID();
}

characterIDNumbersJoin = characterIDNumbers.join(", ");

// console.log(characterOneNumber)

// setting api request to pull with 10 separate character ID's so that we can get an array of data to manipulate for those 10 characters
const URL = `https://rickandmortyapi.com/api/character/${characterIDNumbersJoin}`;

// making variables to display on the screen



$.ajax(URL).then(function (data) {
  console.log({ data });
  $("#characterImage").append(`<img src="${data[randomCharacterRecieved].image}"/><p>${data[randomCharacterRecieved].name}`);

  // gets the names in each character pulled from the array an adds them to a select option
  data.forEach((element) => {
    $("#characterOption").append(
      `<option value="${element.name}">${element.name}</option>`
    );
  });

  console.log($('#characterOption').find(":selected").text())

  //compares the character name attached to the image to the data selected and lets you know if you guess correctly
  $('#guessSelectionForm').submit(function(event){
    event.preventDefault();
    if ($('#characterOption').find(":selected").text() == data[randomCharacterRecieved].name) {
        numberOfGuesses++
        $('body').append(`<p>${$('#characterOption').find(":selected").text()} is the correct answer! it took you ${numberOfGuesses} tries.</p>`)
    } else {
        // console.log($('#characterOption').find(":selected").text())
        $('body').append(`<p>${$('#characterOption').find(":selected").text()} is NOT the correct answer!</p>`)
        numberOfGuesses++
    }
  })
  
});

// $('#difficultyLevelForm').submit(function(event){
//     event.preventDefault();
//     if ($('#characterOption').find(":selected").text() == data[randomCharacterRecieved].name) {
//         numberOfGuesses++
//         $('body').append(`<p>${$('#characterOption').find(":selected").text()} is the correct answer! it took you ${numberOfGuesses} tries.</p>`)
//     } else {
//         // console.log($('#characterOption').find(":selected").text())
//         $('body').append(`<p>${$('#characterOption').find(":selected").text()} is NOT the correct answer!</p>`)
//         numberOfGuesses++
//     }
//   })