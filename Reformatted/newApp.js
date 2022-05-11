const guessCharacter = {
  dificultyLevel: 10,
  guess: 0,
  getRandomNumber: (largestNumber) => {
    return Math.floor(Math.random() * largestNumber);
  },
  // displays a character image on the screen and asks you to guess which charcter it is
  play: () => {
    location.assign('gamePage.html')
    console.log('play')

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
}
guessCharacter.start()