/*
Contains a 'Word' constructor that depends on the Letter constructor. 

This is used to create an object representing the current word the user is attempting to guess. 
That means the constructor defines:

  * An array of `new` Letter objects representing the letters of the underlying word

  * A function that returns a string representing the word. This should call the function on 
    each letter object (the first function defined in `Letter.js`) that displays the character 
    or an underscore and concatenate those together.

  * A function that takes a character as an argument and calls the guess function on each 
    letter object (the second function defined in `Letter.js`)
*/

var Letter = require('./Letter')

function Word(guessWord) {
  this.word = guessWord
  this.letters = this.word.split('').map(letter => new Letter(letter))
  this.toString = () => this.letters.map(lObj => lObj.toString()).join(' ')
  this.guessLetter = (letter) => this.letters.map(lObj => lObj.checkLetter(letter))
}
module.exports = Word

function UnitTest() {
  const testData = [
    {
      desc: "Check for 'l' in 'hello'",
      word: "hello",
      guessedLetter: "l",
      expectString: "_ _ l l _",
      expect: "pass"
    },
    {
      desc: "Check for 'a' in 'hello'",
      word: "hello",
      guessedLetter: "a",
      expectString: "_ _ _ _ _",
      expect: "fail"  // This is a negative test case.  We expect failure.
    },
    {
      desc: "Check for 'A' in 'a'",
      word: "a",
      guessedLetter: "A",
      expectString: "a",
      expect: "pass"
    },
    {
      desc: "Check for 'a' in 'Apple'",
      word: "Apple",
      guessedLetter: "a",
      expectString: "A _ _ _ _",
      expect: "pass"
    }
  ]

  console.log()
  let testBanner = "Unit testing 'Word' constructor"
  let underLines = "-".repeat(testBanner.length)
  console.log(testBanner)
  console.log(underLines)

  let nPassed = 0;
  let nFailed = 0;
  testData.map((testCase, index) => {
    process.stdout.write(`${index + 1}. ${testCase.desc}  `)
    let w = new Word(testCase.word)
    w.guessLetter(testCase.guessedLetter)
    process.stdout.write(`[${w.toString()}] `)
    if (w.toString() === testCase.expectString) {
      nPassed++
      let results = (testCase.expect === "pass") ? "PASS" : "PASS (we expected a failure and got it)" 
      console.log(results)
    } else {
      nFailed++
      console.log("FAIL")
    }
  })
  console.log(`\nTest results: ${nPassed} passed, ${nFailed} failed\n`)
}

// UnitTest()