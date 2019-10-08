// This file mimics a movie-themed 'Wheel of Fortune' console game.
//
// It relies upon a couple word-based and letter-based javascript constructors 
// for transforming a movie title string into an array of word objects.
//
// Word objects are comprised of letter objects that maintain state
// about which letters have been already guessed correctly.
//
// Game play proceeds until the user runs out of turns or guesses the word.

 var movieTitles = require('./movies')
 var WordGame = require('./WordGame')

const MOVIE_GUESS_PROMPT = "I'm thinking of a movie title.  Want to guess it?"
const movieGamePrompt = [
  {
    type: 'confirm',
    name: 'playGame',
    message: MOVIE_GUESS_PROMPT,
    default: true
  }
];

const GUESS_LETTER_PROMPT = "Guess a letter: "
const GUESS_LETTER_FAIL = "Backup and enter a single letter!"
const letterPrompt = [
  {
    type: 'input',
    name: 'guessLetter',
    message: GUESS_LETTER_PROMPT,
    validate: function(value) {
      var pass = value.match(
        /^[A-Z,a-z,0-9]$/
      );
      if (pass) {
        return true;
      }
      return GUESS_LETTER_FAIL;
    }
  }
]

movieGame = new WordGame(movieTitles, movieGamePrompt, letterPrompt)
movieGame.play()