# Console-based word guessing game.

## Description

This assignment mimics a movie-themed 'Wheel of Fortune' game.

## Purpose

Get experience with:

* node.js console applications and recursion
* inquirer npm package for user input
* javascript constructor invocation pattern (using 'new')

## Notes

The implementation relies upon a couple word-based and letter-based javascript constructors 
for transforming a movie title string into an array of word objects.

Word objects are comprised of letter objects that maintain state
about which letters have been already guessed correctly.

Game play proceeds until the user runs out of 'misses' or guesses the word.

## Typical game play looks like this ...

```
$ node index.js 

? I'm thinking of a movie title.  Want to guess it? Yes
_ _ _   _ _ _ _ _ _ _ _ _
? Guess a letter:  a
Correct
_ _ _   _ _ _ _ A _ _ _ _
? Guess a letter:  b
Incorrect
_ _ _   _ _ _ _ A _ _ _ _
? Guess a letter:  c
Incorrect
_ _ _   _ _ _ _ A _ _ _ _
? Guess a letter:  d
Correct
_ _ _   _ _ D _ A _ _ _ _
? Guess a letter:  e
Correct
_ _ E   _ _ D _ A _ _ E _
? Guess a letter:  t
Correct
T _ E   _ _ D _ A T _ E _
? Guess a letter:  h
Correct
T H E   _ _ D _ A T H E _
? Guess a letter:  R
Correct
T H E   _ _ D _ A T H E R
? Guess a letter:  g
Correct
T H E   G _ D _ A T H E R
? Guess a letter:  o
Correct
T H E   G O D _ A T H E R
? Guess a letter:  f
T H E   G O D F A T H E R
Congratulations!

? I'm thinking of a movie title.  Want to guess it? Yes
_ _ _ _ _ _   _ _ _ _ _ _ _   _ _ _ _ _ _ _ _
? Guess a letter:  a
Correct
_ _ _ _ _ _   _ _ _ _ _ _ _   _ _ A _ _ _ _ _
? Guess a letter:  s
Correct
S _ _ _ _ _   _ _ _ _ _ _ S   _ _ A _ _ _ _ _
? Guess a letter:  a
Incorrect
S _ _ _ _ _   _ _ _ _ _ _ S   _ _ A _ _ _ _ _
? Guess a letter:  a
Incorrect
S _ _ _ _ _   _ _ _ _ _ _ S   _ _ A _ _ _ _ _
? Guess a letter:  a
Incorrect
Sorry, you ran out of guesses.

? I'm thinking of a movie title.  Want to guess it? No
Goodbye
```

## Lessons learned

I played with test driven development while implenting the
Letter and Word constructors.  I also put together a little
test harness for exercising these components with multiple
test cases.  The mix of effort between test code and game code
felt like 80%/20%, which seemed burdensome but it did
yield some bug catches (like mispelling a variable name).

Just as words are comprised of letters, so are titles comprised
of words.  Some object-oriented design would work nicely here if
I refactored.

I'm sure the inquirer.js package supports some screen management
that allows re-writing the latest guess of the movie title in
the same place on the console.
