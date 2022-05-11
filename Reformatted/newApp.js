const guessCharacter = {
  dificultyLevel: 10,
  guessTotal: 0,
  getRandomNumber: (largestNumber) => {
    return Math.floor(Math.random() * largestNumber);
  },
  // displays a character image on the screen and asks you to guess which charcter it is
  play: () => {
    // console.log('play function happening')
    console.log('play function')
    window.location.assign('./gamePage.html')
    console.log("do we get here")
    // window.location.reload()
    // everything under this line doesn't run in play function
    // console.log('do I get here')

  //   $('body').append(`<header class="everything">
  //   <h1>Guess that Rick & Morty Character!</h1>
  // </header>
  // <body class="everything">
  //   <div id="characterImage"></div>
  //   <div id="formDiv">
  //     <form id="guessSelectionForm">
  //         <select name="characterOption" id="characterOption">

  //         </select>
  //         <button>is this the character?</button>
  //     </form>
  //   </div>
  //   <p id="confirmationText"></p>
  // </body>`)

    // creates an array of character ID numbers
    const characterIDs = [];
    for (let index = 0; index < guessCharacter.dificultyLevel; index++) {
    characterIDs[index] = guessCharacter.getRandomNumber(826);
    }
    const randomCharacterRecieved = guessCharacter.getRandomNumber(guessCharacter.dificultyLevel);

    // Pull request from the Rick and Morty API for characters based on their ID numbers.
    const URL = `https://rickandmortyapi.com/api/character/${characterIDs.join(", ")}`;

    $.ajax(URL).then(function (data) {
      $("#characterImage").append(`<img src="${data[randomCharacterRecieved].image}"/>${data[randomCharacterRecieved].name}<p>`);
      data.forEach((element) => {$("#characterOption").append(`<option value="${element.name}">${element.name}</option>`);});
    
      //compares the character name attached to the image to the data selected and lets you know if you guess correctly
      $("#guessSelectionForm").submit(function (event) {
        event.preventDefault();
        if (
          $("#characterOption").find(":selected").text() == data[randomCharacterRecieved].name && guessCharacter.guessTotal === 0) {
          guessCharacter.guessTotal++;
          $("#confirmationText").text(`${$("#characterOption").find(":selected").text()} is the correct answer! it took you ${guessCharacter.guessTotal} guess!`);
        } else if (
          $("#characterOption").find(":selected").text() == data[randomCharacterRecieved].name) {
          guessCharacter.guessTotal++;
          $("#confirmationText").text(`${$("#characterOption").find(":selected").text()} is the correct answer! it took you ${guessCharacter.guessTotal} tries.`);
        } else {
          $("#confirmationText").text(`${$("#characterOption").find(":selected").text()} is NOT the correct answer!`);
          guessCharacter.guessTotal++;
        }
      });
    });
  },
  // sets the difficulty and starts the game
  start: () => {
    $('#startForm').submit( (digitalClick) => {
      digitalClick.preventDefault()
      if ($('#difficultyLevelSelector').find(":selected").text() === "easy") {
        guessCharacter.dificultyLevel = 10
      } else if ($('#difficultyLevelSelector').find(":selected").text() === "medium") {
        guessCharacter.dificultyLevel = 20
      } else if ($('#difficultyLevelSelector').find(":selected").text() === "hard") {
        guessCharacter.dificultyLevel = 30
      } else if ($('#difficultyLevelSelector').find(":selected").text() === "insane") {
        guessCharacter.dificultyLevel = 50
      }
      guessCharacter.play()
    })
  },  
  reset: () => {
    window.location.assign('startPage.html')
    guessCharacter.start()
  },
  startGame: () => {
    window.location.assign('gamePage.html')
    console.log('do I get here')
    guessCharacter.play()
  }
}
guessCharacter.start()