# Ceros Ski Code Challenge

Welcome to the Ceros Code Challenge - Ski Edition!

My submission for the Ceros Code Challenge - Ski Edition!

You can play the live version here: http://ceros-ski.herokuapp.com/  

Or deploy it locally by running:
```
npm install
npm run dev
```

**NEW FEATURES / CHANGES MADE**
I made some modification and fixed some bugs as instructed here: https://github.com/tobbie/ceros-ski-master. 

Below are list of changes and new features I added:

* Fixed a bug that crashes the game when the skier crashes with an obstacle and the user presses the left arrow key.
* The bug was as a result of the turnLeft direction function setting the new direction to an invalid value when the skier is in a crashed state.
    1. Fixed the bug
    2. Wrote unit tests to make sure this never happens

*
