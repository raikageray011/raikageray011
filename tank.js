const HEALTH = 3;
const ENERGY = 1;
const COLORS = ['blue', 'red', 'green'];
const RANGE = 4;

export class Tank {
    /**
     * Holds a tank instance
     * @param {String} name A String representing the name of the Tank
     * @param {String} uuid A unique user id for the player owning the Tank.
     * @param {number} rand A random number representing the tank's color
     * @param {Array<number>} point A point on the board representing this tank's location
     */
    constructor(name, uuid, rand, point) {
        this.health = HEALTH;
        this.energy = ENERGY;
        this.range = RANGE;
        this.name = name;
        this.uuid = uuid;

        let color_choice = Math.floor(rand*COLORS.length);
        this.color = COLORS[color_choice];

        this.location = point;
        this.next_location = point;
    }

    /**
     * Gives distance to point
     * @param {Array<number>} point 
     * @returns A number representing the Manhatten distance from this tank to the point
     */
    distance_to(point) {
        return Math.abs(this.location[0] - point[0]) + Math.abs(this.location[1] - point[1]);
    }

    /**
     * Move the tank by to the specified position
     * @param {Array<number>} point The point to put the tank
     */
    move(point) {
        if (this.energy <= 0) { return; }
        this.next_location = point;
        this.energy -= 1;
    }

    /**
     * This tank will try to attack an opposing tank. Tie always goes to the attacker.
     * @param {Tank} tank The opponent tank to attack
     * @returns A bool representing if the attack was successful
     */
    attack(tank) {
        if (this.energy <= 0) { return false; }
        let can_attack = (tank.distance_to(this.location) <= this.range) || (tank.distance_to(this.next_location) <= this.range);
        if (can_attack) {
            tank.health -= 1;
        }
        this.energy -= 1;
        return can_attack
    }

    /**
     * This tank extends its range by one permanently
     */
    extend_range() {
        if (this.energy <= 1) { return; }
        this.range += 1;
        this.energy -= 2;
    }

    /**
     * This tank will try to give energy to another tank. It uses their energy.
     * @param tank The tank to give energy to
     * @returns If the gift was successful
     */
    give_energy(tank) {
        if (this.energy <= 0) { return; }

        let can_give = (tank.distance_to(this.location) <= this.range) || (tank.distance_to(this.next_location) <= this.range);
        if (can_give) {
            this.energy -= 1;
            tank.energy += 1;
        }

        return can_give;
    }

    /**
     * Cleans up the tank data at the end of the turn
     * @returns A bool representing if this tank is dead
     */
    end_turn() {
        this.location = this.next_location;

        return this.health <= 0;
    }
}