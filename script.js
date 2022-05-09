if ($){console.log('jQuery Activated!')}

// pull 10 random characters from rick and morty API
// https://rickandmortyapi.com/api/character/1,183 (example characterOneNumber, characterTwoNumber, ...)


// making the character one id number be a random number between 1 and 826(the total number of rick and morty characters)
// Inspiration below
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor

function getRandomCharacterID() {
    return Math.floor(Math.random() * 826)
}

// put numbers in an array

let characterIDNumbers = []

// will eventually get input from the user for how many options they want to choose from 
const amountOfOptions = 5

for (let index = 0; index < amountOfOptions; index++) {
    characterIDNumbers[index] = getRandomCharacterID()
}

characterIDNumbersJoin = characterIDNumbers.join(', ')

// console.log(characterOneNumber)

// setting api request to pull with 10 separate character ID's so that we can get an array of data to manipulate for those 10 characters
const URL = `https://rickandmortyapi.com/api/character/${characterIDNumbersJoin}`

// making variables to display on the screen 

let $randomCharacterImage = $('#characterImage')



$.ajax(URL).then(function(data){
    console.log(data)
    console.log(data[1].image)
    $('#characterImage').append(`<img src="${data[0].image}"/>`)
})