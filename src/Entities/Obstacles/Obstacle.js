import * as Constants from "../../Constants";
import { Entity } from "../Entity";
import { randomInt } from '../../Core/Utils';

const ROCKS = [Constants.ROCK1, Constants.ROCK2];

const TREES = [Constants.TREE, Constants.TREE_CLUSTER];

const JUMP_RAMP = [Constants.JUMP_RAMP];

const assetTypes = [
    ...TREES,
    ...ROCKS,
    ...JUMP_RAMP,
];

export const OBSTACLE_TYPES = {
    ROCKS:"ROCK",
    TREES:"TREES",
    RAMP:"RAMP",
}

const OBSTACLE_TYPE_MAP = {
    [OBSTACLE_TYPES.ROCKS]: ROCKS,
    [OBSTACLE_TYPES.TREES]: TREES,
    [OBSTACLE_TYPES.RAMP]: JUMP_RAMP,
}

export class Obstacle extends Entity {

    constructor(x, y) {
        super(x, y);
        this.assetIdx = randomInt(0, assetTypes.length - 1);
        this.assetName = assetTypes[this.assetIdx];
        this.type = this._getObstacleType()
    }

    getType(){

        return this.type;
    }

    _getObstacleType(){

        for(let key in OBSTACLE_TYPE_MAP){

            if(OBSTACLE_TYPE_MAP[key].includes(this.assetName)){
                
                return key
            
            }

        }

    }

}