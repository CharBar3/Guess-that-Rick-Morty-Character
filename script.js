// Function for getting a random number 1 and largestNumber
function getRandomNumber(largestNumber){
  return Math.floor(Math.random() * largestNumber);
}

// Array of ID numbers used to get characters from the Rick and Morty API
let characterIDNumbers = [];

// amount of characters 
const amountOfOptions = 10;

// variable to count the amount of guesses it took to get the correct one
let numberOfGuesses = 0; 

// variable to pick a character from the recieved data at random
const randomCharacterRecieved = getRandomNumber(amountOfOptions)

for (let index = 0; index < amountOfOptions; index++) {
  characterIDNumbers[index] = getRandomNumber(826);
}

characterIDNumbersJoin = characterIDNumbers.join(", ");

// console.log(characterOneNumber)

// setting api request to pull with 10 separate character ID's so that we can get an array of data to manipulate for those 10 characters
const URL = `https://rickandmortyapi.com/api/character/${characterIDNumbersJoin}`;

// making variables to display on the screen



$.ajax(URL).then(function (data) {
//   console.log({ data });
  $("#characterImage").append(`<img src="${data[randomCharacterRecieved].image}"/>${data[randomCharacterRecieved].name}<p>`);

  // gets the names in each character pulled from the array an adds them to a select option
  data.forEach((element) => {
    $("#characterOption").append(
      `<option value="${element.name}">${element.name}</option>`
    );
  });

  //compares the character name attached to the image to the data selected and lets you know if you guess correctly
  $('#guessSelectionForm').submit(function(event){
    event.preventDefault();
    if ($('#characterOption').find(":selected").text() == data[randomCharacterRecieved].name && numberOfGuesses === 0) {
        numberOfGuesses++
        $('#confirmationText').text(`${$('#characterOption').find(":selected").text()} is the correct answer! it took you ${numberOfGuesses} guess!`)
    } else if ($('#characterOption').find(":selected").text() == data[randomCharacterRecieved].name) {
        numberOfGuesses++
        $('#confirmationText').text(`${$('#characterOption').find(":selected").text()} is the correct answer! it took you ${numberOfGuesses} tries.`)
    } else {
        $('#confirmationText').text(`${$('#characterOption').find(":selected").text()} is NOT the correct answer!`)
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