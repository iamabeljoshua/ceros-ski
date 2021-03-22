# Ceros Ski Code Challenge

Welcome to the Ceros Code Challenge - Ski Edition!

My submission for the Ceros Code Challenge - Ski Edition!

You can play the live version here: https://iamabeljoshua.github.io/ceros-ski/

Or deploy it locally by running:
```
npm install
npm run dev
```

**NEW FEATURES / CHANGES MADE**
<br/>
I made some modification and fixed some bugs as instructed here: https://github.com/tobbie/ceros-ski-master. 

### Below are list of changes and new features I added:

1. Fixed a bug that crashes the game when the skier crashes with an obstacle and the user presses the left arrow key.
   The bug was as a result of the turnLeft(function used to change skier's direction) setting the new direction to an invalid value when the skier is in a crashed      state.
   
   1. Fixed the bug
   2. Wrote unit tests to make sure this never happens

2. Added an ability for the skier to jump over rocks. The user can either press the J key to jump or the skier jumps automatically when in collision with a ramp.

3. Added Rhinos that chases the skier. The Rhino eats the skier when it catches up to him. Also used the Rhino sequence png files for the eating animation.

4. Added a game over status and a way for the user to restart / reset the game.

5. Added a way for the user to pause and play the game.

6. Implemented scores and life for the game.

7. Added a panel in the UI that shows the current score, life and status of the game.

8. Added a feature that allows the user to increase the skier's speed when the F key is pressed.

9. Wrote more unit tests


### Feature suggestions and improvements:

1. One exciting feature we can work on is responsiveness. So users can play it on mobile devices as well.
2. We can also add a background music to make the game more captivating
3. We can implement a feature to play a different background music when the skier is being chased by a Rhino (this will be fun!)
4. We can also add game pickups (like health - to increase the skier's life)



