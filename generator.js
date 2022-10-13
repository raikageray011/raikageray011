// How often the generator generates, one out of every GENERATION_TURNS turns
const GENERATION_TURNS = 3;
// How close a tank has to be to get energy from the generator by manhatten distance
const GENERATION_RADIUS = 2;
// How much energy the tank gets per generation
const GENERATION_POWER = 1;

export class Generator {
    /**
     * Holds a generator object
     * @param {Array<number>} point A point on the board representing this generator's location
     */
    constructor(point) {
        this.location = point;
        this._current_turn = 0;
    }

    /**
     * Gives each tank an appropriate amount of energy and increments the turn counter
     * @param {Iterable<Tank>} tanks 
     */
    run_turn(tanks) {
        this._current_turn += 1;
        if (this._current_turn % GENERATION_TURNS != 0) { return; }
        
        tanks.forEach((tank) => {
            if (tank.distance_to(this.point) <= GENERATION_RADIUS) {
                tank.energy += GENERATION_POWER;
            }
        });
    }
}