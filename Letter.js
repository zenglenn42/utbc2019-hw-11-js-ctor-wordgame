/*

This file contains a 'Letter' constructor with the following behaviors:

  This constructor should be able to either display an underlying character or a blank placeholder 
  (such as an underscore), depending on whether or not the user has guessed the letter. 

  That means the constructor should define:

  * A string value to store the underlying character for the letter

  * A boolean value that stores whether that letter has been guessed yet

  * A function that returns the underlying character if the letter has been guessed, 
    or a placeholder (like an underscore) if the letter has not been guessed

  * A function that takes a character as an argument and checks it against the 
    underlying character, updating the stored boolean value to true if it was guessed correctly

*/

function Letter(stringValue, beenGuessed = false, placeHolder = "_") {
    this.stringValue = stringValue
    this.beenGuessed = beenGuessed
    this.placeHolder = placeHolder
    this.toString = () => (this.beenGuessed) ? this.stringValue : this.placeHolder
    this.checkLetter = (letter) => {
      if (this.beenGuessed) return false // don't retest already guessed letter
      return this.beenGuessed = (letter === this.stringValue)
    }
}
module.exports = Letter

function UnitTest() {
  const testData = [
    {
      desc: "Check if 'l' === 'l'",
      letter: "l",
      guessedLetter: "l",
      expectCheckLetter: true,
      expect: "pass"
    },
    {
      desc: "Check if 'a' === 'b'",
      letter: "a",
      guessedLetter: "b",
      expectCheckLetter: false,
      expect: "fail"  // This is a negative test case.  We expect failure.
    },
    // {
    //   desc: "Check if 'a' === 'c'",
    //   letter: "a",
    //   guessedLetter: "c",
    //   expectCheckLetter: true,
    //   expect: "pass"  // This is a failing test case.
    // }
  ]

  console.log()
  let testBanner = "Unit testing 'Letter' constructor"
  let underLines = "-".repeat(testBanner.length)
  console.log(testBanner)
  console.log(underLines)

  let nPassed = 0;
  let nFailed = 0;
  testData.map((testCase, index) => {
    process.stdout.write(`${index + 1}. ${testCase.desc} ... `)
    let l = new Letter(testCase.letter)
    if (l.checkLetter(testCase.guessedLetter) === testCase.expectCheckLetter) {
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

UnitTest()