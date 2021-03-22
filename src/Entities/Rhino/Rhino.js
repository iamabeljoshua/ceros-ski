import * as Constants from "../../Constants";
import { intersectTwoRects, randomInt } from "../../Core/Utils";
import { Entity } from "../Entity";

const rhinoAssets = [
    Constants.RHINO_DEFAULT,
    ...Constants.RHINO_RUN_LEFT_SEQUENCE_ASSETS
];

//number of ticks before a new asset from the running sequence asset is used to represent the rhino
const TICK_PER_RUNNING_FRAME = 30;

export class Rhino extends Entity {

    constructor(x, y) {
        super(x, y);
        this.assetName = rhinoAssets[0];
        this.speed = randomInt(Constants.MIN_RHINO_SPEED, Constants.MAX_RHINO_SPEED);
        this.isEatingSkier = false;
        this.eatinSequenceIndex = 0;
        this.runningLeftSequenceIndex = 0;
    }

    checkCollisionWithSkier(assetManager, skierBounds, gameOverCallback) {

        if (intersectTwoRects(this.getBounds(assetManager), skierBounds)) {

            this.isEatingSkier = true;

            this.beginEatingSequence(gameOverCallback);

            return true;
        }

        return false;

    }

    beginEatingSequence(gameOverCallback) {

        this.eatinSequenceIndex = 0;

        let sequenceTimer = setInterval(() => {

            this.eatinSequenceIndex += 1;

            if (this.eatinSequenceIndex >= Constants.RHINO_EATING_SEQUENCE_ASSETS.length) {

                gameOverCallback();
            
                clearInterval(sequenceTimer)
            
            }

            else {

                this.updateAssetForEatingSequence();

            }

        }, Constants.RHINO_EATING_SEQUENCE_DELAY_MILLS)

    }

    updateAssetForEatingSequence() {

        this.assetName = Constants.RHINO_EATING_SEQUENCE_ASSETS[this.eatinSequenceIndex];

    }

    updateRunningAsset(skierPositionX, skierPositionY){

        if(!this.isEatingSkier){ // update running asset only if not eating skier.

            let yDifference = Math.abs(this.y - skierPositionY);

            let xDifference = Math.abs(this.x - skierPositionX);

            //if moving diagonally, or horizontally use one of the 'running left' assets

            if((yDifference > 0 && xDifference > 0) || xDifference > 0 ){

                this.runningLeftSequenceIndex+=1;

                let lengthOfRunningSequence = Constants.RHINO_RUN_LEFT_SEQUENCE_ASSETS.length;

                if(this.runningLeftSequenceIndex > TICK_PER_RUNNING_FRAME * lengthOfRunningSequence){ 

                    this.runningLeftSequenceIndex = 1;
                
                }

                this.assetName = Constants.RHINO_RUN_LEFT_SEQUENCE_ASSETS[parseInt(this.runningLeftSequenceIndex / TICK_PER_RUNNING_FRAME) % lengthOfRunningSequence];

            }

            else{ // use the default asset

                this.assetName = Constants.RHINO_DEFAULT;

            }

        }

    }

    canMove() {

        return !this.isEatingSkier;

    }

    update(skierPositionX, skierPositionY) {

        //update the asset
        this.updateRunningAsset(skierPositionX, skierPositionY);
        
        //use a little logic to move the rhino towards the skier.
        this.moveRhinoTowardsSkier(skierPositionX, skierPositionY);
        
    }

    moveRhinoTowardsSkier(skierPositionX, skierPositionY){

         //litle algorithm to move the rhino towards the skier

         if (this.canMove()) {

            let speedX = Math.min(this.speed, Math.abs(this.x - skierPositionX))

            let speedY = Math.min(this.speed, Math.abs(this.y - skierPositionY))

            let xMultiplier = this.x < skierPositionX ? 1 : -1;

            let yMultiplier = this.y < skierPositionY ? 1 : -1;


            this.x += speedX * xMultiplier;
            this.y += speedY * yMultiplier;

        }


    }


}