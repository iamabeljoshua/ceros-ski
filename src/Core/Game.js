import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';
import { RhinoManager } from "../Entities/Rhino/RhinoManager";

export class Game {

    gameWindow = null;

    isPaused = false;

    isGameOver = false;

    animationFrameId = 0;

    constructor() {
        this.assetManager = new AssetManager();
        this.prepare();
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    prepare(){
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0);
        this.obstacleManager = new ObstacleManager();
        this.rhinoManager = new RhinoManager();
        this.isPaused = false;
        this.isGameOver = false;
        this.gameWindow = null;
    }

    init() {
        this.obstacleManager.placeInitialObstacles();
    }

    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    run() {

        if(this.skier.life <=0){
            this.isGameOver = true;
            this.onGameOver();
        }

        if(!this.isPaused && !this.isGameOver){
            this.canvas.clearCanvas();
            this.updateGameWindow();
            this.drawGameWindow();
        }

        this.invalidateGameStatusUI();

        this.animationFrameId = requestAnimationFrame(this.run.bind(this));
    }

    updateGameWindow() {

        this.skier.update();

        this.rhinoManager.updateRhinos(this.skier.getPosition());

        const previousGameWindow = this.gameWindow;

        this.calculateGameWindow();

        //delete obstacles out of range to free memory.
        this.obstacleManager.deleteOutOfBoundObstacles(this.gameWindow);

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);

        this.rhinoManager.deleteOutOfBoundRhinos(this.gameWindow);

        this.rhinoManager.placeNewRhino(this.gameWindow);

        this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);

        if (!this.skier.isBeingEaten) { // check for collision with rhino if skier is not being eaten.

            if (this.rhinoManager.checkCollisionWithSkier(this, this.skier.getBounds(this.assetManager))) {
                this.skier.setIsBeingEaten(true);
            }

        }
    }

    drawGameWindow() {
        
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);

        if(!this.skier.isBeingEaten){ //don't draw the skier if currently being eaten by a rhino
            this.skier.draw(this.canvas, this.assetManager);
        }

        this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
        
        this.rhinoManager.drawRhinos(this.canvas, this.assetManager);
    
    }

    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    handleKeyDown(event) {

        //key events are handled based on priority.

        //first we handle keys that are functional at all times, pause, play and reset game keys

        switch (event.which) {

            case Constants.KEYS.R:
                this.reset();
                event.preventDefault();
                break;

            case Constants.KEYS.SPACE_BAR:
                this.isPaused = !this.isPaused;
                event.preventDefault();
                break;

        }

        //then we handle the ones that only works when the skier is crashed.
        if (this.skier.isCrashed()) {

            this.handleSkierCollisionKeyDownEvents(event);

        }

        //then handle the rest.
        else {

            switch (event.which) {

                case Constants.KEYS.J:
                    this.skier.startJumping();
                    event.preventDefault();
                    break;

                case Constants.KEYS.F:
                    this.skier.startTurboSpeed();
                    event.preventDefault();
                    break;

                case Constants.KEYS.LEFT:
                    this.skier.turnLeft();
                    event.preventDefault();
                    break;
                case Constants.KEYS.RIGHT:
                    this.skier.turnRight();
                    event.preventDefault();
                    break;
                case Constants.KEYS.UP:
                    this.skier.turnUp();
                    event.preventDefault();
                    break;
                case Constants.KEYS.DOWN:
                    this.skier.turnDown();
                    event.preventDefault();
                    break;
            }

        }
    }

    //handles key events when a skier is in collision with an obstacle
    handleSkierCollisionKeyDownEvents(event) {

        const KEYS_TO_DIRECTION_MAP = {
            [Constants.KEYS.LEFT]: Constants.SKIER_DIRECTIONS.LEFT,
            [Constants.KEYS.RIGHT]: Constants.SKIER_DIRECTIONS.RIGHT,
            [Constants.KEYS.DOWN]: Constants.SKIER_DIRECTIONS.DOWN,
        }

        if (KEYS_TO_DIRECTION_MAP[event.which]) {

            let obstacle = this.skier.getCurrentCollisionObstacle(this.assetManager, this.obstacleManager);

            let collisionBound = obstacle.getBounds(this.assetManager);

            this.skier.moveSkierBeyoundCollisionBound(this.assetManager, collisionBound, KEYS_TO_DIRECTION_MAP[event.which]);

            event.preventDefault();

        }


    }

    invalidateGameStatusUI(){

        //get the dom elements adn set their respective value.

        let skierLifeCountElement = document.getElementById("skierLifeCount");

        let gameStatusElement = document.getElementById("gameStatus");

        let gameScoreElement = document.getElementById("score");

        skierLifeCountElement.innerText = this.skier.life;

        gameScoreElement.innerText = this.skier.score;

        gameStatusElement.innerText = this.isGameOver ? "Game Over" : this.isPaused ? "Paused" : "Playing";

    }

    onGameOver(){

        this.isGameOver = true;

        alert(`Game over... Your score was: ${this.skier.score}.`)

        this.reset();

    }


    reset(){ // reset game...

        //cancel pending animation frame callbacks
        cancelAnimationFrame(this.animationFrameId);

        //reset the game tracking variables
        this.prepare();

        this.init();

        this.run();

    }

}