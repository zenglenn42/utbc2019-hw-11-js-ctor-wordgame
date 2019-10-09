var Word = require('./Word')
var inquirer = require('inquirer')

const WORD_DELIM = "   " // Spacing between words.
const MAX_WRONG_GUESSES = 5
const GOODBYE = "Goodbye"
const WINNER = "Congratulations!"
const BAD_GUESS = "Incorrect"
const GOOD_GUESS = "Correct!"
const OUT_OF_GUESSES = "Sorry, you ran out of guesses."
const INQUIRER_ERROR = "Unexpected inquirer response."

class WordGame {
  constructor(inputData, gamePrompt, letterPrompt, wordDelimeter = WORD_DELIM, maxWrongGuesses = MAX_WRONG_GUESSES) {
    this.inputData = inputData
    this.wordDelimeter = wordDelimeter
    this.maxWrongGuesses = maxWrongGuesses
    this.gamePrompt = gamePrompt
    this.letterPrompt = letterPrompt
  }

  play() {
    console.log()
    inquirer.prompt(this.gamePrompt).then(answers => {
      if (answers.playGame) {
        this.playRound()
      } else {
        console.log(`${GOODBYE}\n`)
        return
      }
    })
  }

  playRound() {
    // Randomly select a movie from an array of several movie titles.
    let ithPhrase = Math.floor(Math.random() * this.inputData.length)
  
    // Fetch and remove movie from input array.
    let wordPhrase = this.inputData.splice(ithPhrase, 1)[0]
  
    // Transform movie title string to an array of word objects.
    let wordObjs = wordPhrase.split(" ").map(word => new Word(word))
  
    let currGuess = wordObjs.map(wordObj => wordObj.toString()).join(this.wordDelimeter)
    let remainingMisses = this.maxWrongGuesses
    let solved = false
    this.guessLetters(currGuess, remainingMisses, wordObjs, solved)
  }

  guessLetters(prevGuess, remainingMisses, wordObjs, solved) {
    if (remainingMisses > 0 && !solved) {
      console.log(prevGuess)
      inquirer.prompt(this.letterPrompt).then(answers => {
        if (answers.guessLetter) {
          wordObjs.map(wordObj => wordObj.guessLetter(answers.guessLetter));
          let currGuess = wordObjs.map(wordObj => wordObj.toString()).join(this.wordDelimeter)
          solved = (currGuess.indexOf('_') === -1)
          if (solved) {
            console.log(currGuess)
            console.log(WINNER)
            this.play()
          } else {
              if (currGuess === prevGuess) {
                remainingMisses--
                console.log(BAD_GUESS)
                if (remainingMisses <= 0) {
                  console.log(OUT_OF_GUESSES)
                  this.play()
                }
              } else {
                console.log(GOOD_GUESS)
              }
              this.guessLetters(currGuess, remainingMisses, wordObjs, solved)
          }
        } else {
          throw new Error(INQUIRER_ERROR)
        }
      })
    }
    return
  }
} // end WordGame

module.exports = WordGame