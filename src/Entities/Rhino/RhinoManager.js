import * as Constants from '../../Constants';
import { randomInt } from '../../Core/Utils';
import { Rhino } from "./Rhino";

const DISTANCE_BETWEEN_RHINOS = 50;
const NEW_RHINO_CHANCE = 20;

export class RhinoManager {

    rhinos = [];

    constructor() {

    }

    getRhinos() {
        return this.rhinos;
    }

    drawRhinos(canvas, assetManager) {
        this.rhinos.forEach((rhino) => {
            rhino.draw(canvas, assetManager);
        });
    }

    deleteOutOfBoundRhinos(gameWindow) {

        let activeRhinos = [];

        for(let rhino of this.rhinos){

            //if still within visibility range.
            if(rhino.y >= gameWindow.top - Constants.GAME_HEIGHT){
                activeRhinos.push(rhino);
            }

        }

        this.rhinos = activeRhinos;

    };

    placeNewRhino(gameWindow) {

        if (this.rhinos.length < Constants.MAX_NUMBER_RHINOS) {

            const shouldPlaceRhino = randomInt(1, NEW_RHINO_CHANCE);

            if (shouldPlaceRhino !== NEW_RHINO_CHANCE) {
                return;
            }

            this.placeRhinoInOpenPosition(gameWindow);

        }

    };

    placeRhinoInOpenPosition(gameWindow) {

        let minX = gameWindow.right;

        let maxX = gameWindow.right;

        let minY = gameWindow.top;

        let maxY = gameWindow.top + Constants.GAME_HEIGHT / 2;

        const position = this.calculateOpenPosition(minX, maxX, minY, maxY);

        const newRhino = new Rhino(position.x, position.y);

        this.rhinos.push(newRhino);


    }


    calculateOpenPosition(minX, maxX, minY, maxY) {
        const x = randomInt(minX, maxX);
        const y = randomInt(minY, maxY);

        const foundCollision = this.rhinos.find((rhino) => {
            return (
                x > (rhino.x - DISTANCE_BETWEEN_RHINOS) &&
                x < (rhino.x + DISTANCE_BETWEEN_RHINOS) &&
                y > (rhino.y - DISTANCE_BETWEEN_RHINOS) &&
                y < (rhino.y + DISTANCE_BETWEEN_RHINOS)
            );
        });

        if (foundCollision) {
            return this.calculateOpenPosition(minX, maxX, minY, maxY);
        }
        else {
            return {
                x: x,
                y: y
            };
        }
    }

    updateRhinos(skierPosition) {


        this.rhinos.forEach((rhino) => {
          
            rhino.update(skierPosition.x, skierPosition.y);
        
        })
    }

    checkCollisionWithSkier(gameInstance, skierBounds){

        for(let rhino of this.rhinos){

            let foundCollision = rhino.checkCollisionWithSkier(gameInstance.assetManager, skierBounds, gameInstance.onGameOver.bind(gameInstance));

            if(foundCollision){
                return true;
            }

        }

        return false;
    }
}