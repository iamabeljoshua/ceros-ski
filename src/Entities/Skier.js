import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, minMaxClamp, Rect } from "../Core/Utils";
import { OBSTACLE_TYPES } from "./Obstacles/Obstacle";

export class Skier extends Entity {

    assetName = Constants.SKIER_DOWN;

    direction = Constants.SKIER_DIRECTIONS.DOWN;

    speed = Constants.SKIER_STARTING_SPEED;

    isJumping = false;

    jumpingCountdownTimeoutId = 0;

    isBeingEaten = false;

    score = 0;

    distanceCovered = 0;

    life = Constants.SKIER_LIFE_COUNT

    turboSpeedCoutdownTimeoutId = 0;

    constructor(x, y) {
        super(x, y);
    }

    setDirection(direction) {

        this.direction = direction;

        this.resetJumpingState();

    }

    resetJumpingState() {

        this.isJumping = false;

        clearTimeout(this.jumpingCountdownTimeoutId);

        this.jumpingCountdownTimeoutId = 0;

    }

    setIsBeingEaten(isBeingEaten){
        this.isBeingEaten = isBeingEaten;
    }

    canMove() {

        return !this.isBeingEaten;

    }

    //called on every iteration to update skier state.
    update() {

        //calculate new score...
        this.score = parseInt(this.distanceCovered / this.speed);

        this.updateAsset();

        if (this.canMove()) {

            this.move();

        }

    }



    updateAsset() {

        //set the appropriate asset name based on current state.
        if (this.isJumping) {

            this.assetName = Constants.SKIER_JUMP_1;

        }

        else {

            this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];

        }

    }

    move() {
        switch (this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
        }

    }

    moveSkierLeft() {
        this.x -= this.speed;
        this.distanceCovered +=this.speed;
    }

    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;

        this.distanceCovered += (this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER)*2;

    }

    moveSkierDown() {
        this.y += this.speed;
        this.distanceCovered += this.speed;
    }

    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.distanceCovered += (this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER)*2;
    }

    moveSkierRight() {
        this.x += this.speed;
        this.distanceCovered += this.speed;

    }

    moveSkierUp() {
        this.y -= this.speed;
        this.distanceCovered += this.speed;

    }

    turnLeft() {

        if (this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
            this.moveSkierLeft();
        }

        else {

            //clamp the new calculated direction value to the possible directions that can be reached when turning left.

            let newDirection = minMaxClamp(this.direction - 1, Constants.SKIER_DIRECTIONS.LEFT, Constants.SKIER_DIRECTIONS.RIGHT_DOWN);

            this.setDirection(newDirection);

        }
    }

    turnRight() {

        if (this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {

            this.moveSkierRight();

        }

        else {

            //clamp the new calculated direction value to the possible directions that can be reached when turning right.

            let newDirection = minMaxClamp(this.direction + 1, Constants.SKIER_DIRECTIONS.LEFT_DOWN, Constants.SKIER_DIRECTIONS.RIGHT);

            this.setDirection(newDirection);

        }

    }

    turnUp() {
        if (this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    turnDown() {

        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);

    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {

        const skierBounds = this.getBounds(assetManager);

        //loop through tbe obstacles and check for collision with obstacles (ramp, rocks, trees, etc)

        let obstacles = obstacleManager.getObstacles();

        let obstacleCollidedWith = null;

        for (let obstacle of obstacles) {

            const obstacleBounds = obstacle.getBounds(assetManager);

            const intersects = intersectTwoRects(skierBounds, obstacleBounds);

            //skip over rock collisions when skier is jumping
            if (obstacle.getType() == OBSTACLE_TYPES.ROCKS && this.isJumping) {
                continue;
            }

            //jump the skier when in collision with a ramp
            else if (obstacle.getType() == OBSTACLE_TYPES.RAMP && intersects) {

                this.startJumping(true);

            }

            else if (intersects) {

                obstacleCollidedWith = obstacle;

                break

            }

        }


        if (obstacleCollidedWith) {

            if(!this.isCrashed()){ 
                this.life-=1;
            }

            this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);

        }

    };

    /** Checks if skier is currently in collision with any obstacle and return the obstacle */
    getCurrentCollisionObstacle(assetManager, obstacleManager) {

        let obstacles = obstacleManager.getObstacles();

        const skierBounds = this.getBounds(assetManager);

        for (let obstacle of obstacles) {

            //check for skier collision with obstacle

            const obstacleBounds = obstacle.getBounds(assetManager);

            if (intersectTwoRects(skierBounds, obstacleBounds)) {

                return obstacle;

            }

        }

    }

    /** Move skier beyound the collision point of an obstacle and face the new direction */
    moveSkierBeyoundCollisionBound(assetManager, obstacleBounds, newDirection) {

        const skierAsset = assetManager.getAsset(this.getAssetName());

        switch (newDirection) {

            case Constants.SKIER_DIRECTIONS.LEFT:

                this.x = obstacleBounds.left - skierAsset.width / 2;

                break;

            case Constants.SKIER_DIRECTIONS.RIGHT:

                this.x = obstacleBounds.right + skierAsset.width / 2;

                break;

            case Constants.SKIER_DIRECTIONS.DOWN:

                this.y = obstacleBounds.bottom + skierAsset.height / 2;

                break;

            default:
                break;

        }

        this.setDirection(newDirection);
    }

    isCrashed() {
        return this.direction == Constants.SKIER_DIRECTIONS.CRASH;
    }

    startJumping(resetJumpingCountdown = false) {

        if (resetJumpingCountdown) {

            this.jumpingCountdownTimeoutId = 0;

            clearTimeout(this.jumpingCountdownTimeoutId);

        }

        if (this.jumpingCountdownTimeoutId == 0) {

            this.isJumping = true;

            this.jumpingCountdownTimeoutId = setTimeout(() => {

                this.isJumping = false;

                this.jumpingCountdownTimeoutId = 0;

            }, Constants.SKIER_JUMP_DURATION_MILLS);

        }

    }

    startTurboSpeed() {

        if (this.turboSpeedCoutdownTimeoutId == 0) {

            this.speed = Constants.SKIER_TURBO_SPEED;

            this.turboSpeedCoutdownTimeoutId = setTimeout(() => {

                this.speed = Constants.SKIER_STARTING_SPEED;

                this.turboSpeedCoutdownTimeoutId = 0;

            }, Constants.SKIER_TURBO_SPEED_DURATION_MILLS);

        }

    }

}