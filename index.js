
// This file mimics a movie-themed 'Wheel of Fortune' console game.
//
// It relies upon a couple word-based and letter-based javascript constructors 
// for transforming a movie title string into an array of word objects.
//
// Word objects are comprised of letter objects that maintain state
// about which letters have been already guessed correctly.
//
// Game play proceeds until the user runs out of turns or guesses the word.

 var inquirer = require('inquirer')
 var movieTitles = require('./movies')
 var Word = require('./Word')
 
const WORD_DELIM = "   " // Spacing between words.
const MAX_WRONG_GUESSES = 3

var gamePrompt = [
  {
    type: 'confirm',
    name: 'playGame',
    message: "I'm thinking of a movie title.  Want to guess it?",
    default: true
  }
];

var letterPrompt = [
  {
    type: 'input',
    name: 'guessLetter',
    message: 'Guess a letter: ',
    validate: function(value) {
      var pass = value.match(
        /^[A-Z,a-z,0-9]$/
      );
      if (pass) {
        return true;
      }
      return 'Backup and enter a single letter!';
    }
  }
]

function playGame() {
  inquirer.prompt(gamePrompt).then(answers => {
    if (answers.playGame) {
      playRound()
    } else {
      console.log("Goodbye")
      return
    }
  })
}

function playRound() {
  // Randomly select a movied from an array of several movie titles.
  let ithMovie = Math.floor(Math.random() * movieTitles.length)

  // Fetch and remove movie from input array.
  let movieTitle = movieTitles.splice(ithMovie, 1)[0]

  // Transform movie title string to an array of word objects.
  let movieWords = movieTitle.split(" ").map(word => new Word(word))

  let currGuess = movieWords.map(wordObj => wordObj.toString()).join(WORD_DELIM)
  let remainingMisses = MAX_WRONG_GUESSES
  let solved = false
  guessLetters(currGuess, remainingMisses, movieWords, solved)
}

function guessLetters(prevGuess, remainingMisses, movieWords, solved) {
  if (remainingMisses > 0 && !solved) {
    console.log(prevGuess)
    inquirer.prompt(letterPrompt).then(answers => {
      if (answers.guessLetter) {
        movieWords.map(wordObj => wordObj.guessLetter(answers.guessLetter));
        let currGuess = movieWords.map(wordObj => wordObj.toString()).join(WORD_DELIM)
        solved = (currGuess.indexOf('_') === -1)
        if (solved) {
          console.log(currGuess)
          console.log("Congratulations!")
          playGame()
        } else {
            if (currGuess === prevGuess) {
              remainingMisses--
              console.log("Incorrect")
              if (remainingMisses <= 0) {
                console.log("Sorry, you ran out of guesses.")
                playGame()
              }
            } else {
              console.log("Correct")
            }
            guessLetters(currGuess, remainingMisses, movieWords, solved)
        }
      } else {
        throw new Error("Unexpected inquirer response.")
      }
    })
  }
  return
}

playGame()