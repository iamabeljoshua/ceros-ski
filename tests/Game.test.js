import "babel-polyfill";
import { Skier } from "../src/Entities/Skier";

import * as Constants from "../src/Constants";

const skier = new Skier(0,0);

describe('Skier direction functions', () => {
    
    describe("Behaviour of turnLeft direction function",()=>{

        it("Sets the direction to LEFT when in crashed state", ()=>{

            skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);

            skier.turnLeft();

            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);

        })

        it("Sets the direction to LEFT when in LEFT_DOWN state", ()=>{

            skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT_DOWN);

            skier.turnLeft();

            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);

        })

        it("Sets the direction to LEFT_DOWN when in DOWN state", ()=>{

            skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);

            skier.turnLeft();

            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT_DOWN);

        })

        it("Sets the direction to DOWN when in RIGHT_DOWN state", ()=>{

            skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);

            skier.turnLeft();

            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.DOWN);

        })

        it("Sets the direction to RIGHT_DOWN when in RIGHT state", ()=>{

            skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);

            skier.turnLeft();

            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);

        })
        
    })

    describe("Behaviour of turnRight direction function",()=>{

        it("Sets the direction to LEFT_DOWN when in LEFT state ", ()=>{

            skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT);

            skier.turnRight();

            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT_DOWN);

        })

        it("Sets the direction to DOWN when in LEFT_DOWN state ", ()=>{

            skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT_DOWN);

            skier.turnRight();

            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.DOWN);

        })
        
        it("Sets the direction to DOWN when in LEFT_DOWN state ", ()=>{

            skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT_DOWN);

            skier.turnRight();

            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.DOWN);

        })

        it("Sets the direction to RIGHT_DOWN when in DOWN state", ()=>{

            skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);

            skier.turnRight();

            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);

        })

        it("Sets the direction to RIGHT when in RIGHT_DOWN state", ()=>{

            skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);

            skier.turnRight();

            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);

        })
        
    })


});
