/*

The file containing the logic for the word-guess game, which depends on `Word.js` and:

  * Randomly selects a word and uses the `Word` constructor to store it

  * Prompts the user for each guess and keeps track of the user's remaining guesses.

*/

var movieTitles = require('./movies')
var Word = require('./Word')

// Here's the core logic
//   fetch a word phrase from our input array (of movie titles)
//   create an array of word objects based upon the words in the phrase
//   annunciate the current word guess

var index = Math.floor(Math.random() * movieTitles.length)
var movieTitle = movieTitles.splice(index, 1)[0] // fetch and remove movie title from array
var movieWords = movieTitle.split(" ").map(word => new Word(word))
const wordDelimeter = "   "
movieWords.map(word => process.stdout.write(`${word.toString()}${wordDelimeter}`))
console.log()

// Todo: Guess a word and loop until phrase is solved or we've run out of turns.