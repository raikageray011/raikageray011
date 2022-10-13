import { Tank } from './tank.js';
import { Generator } from './generator.js';
import { seededrand } from './randomness.js';

const HEIGHT = 3;
const WIDTH = 3;
let rand;

export class Board {
    /**
     * A class that handles creating a board randomly and holding the board state
     * @param {String} name The name of the current game as a String
     * @param {Array<Array<String>>} players A list of [player name, player uuid] as Strings
     * @param {number} generators The number of generators to use as a number
     */

    constructor(name, players, generators) {

        rand = seededrand(name);
        
        this._array = [];
        this._tanks = {};
        this._generators = [];
        for (let i = 0; i < HEIGHT; i++) {
            let row = [];
            for (let j = 0; j < WIDTH; j++) {
                row.push(null);
            }
            this._array.push(row);
        }
        this._populate(players, generators);
    }

    /**
     * 
     * @param {Array<Array<String>>} players A list of [player name, player uuid] as Strings
     * @param {number} generators The number of generators to add
     */
    _populate(players, generators) {
        // Code for randome sampling without replacement from
        // https://stackoverflow.com/questions/12987719/javascript-how-to-randomly-sample-items-without-replacement
        let bucket = [];
        for (let i = 0; i < HEIGHT*WIDTH; i++) {
            bucket.push(i);
        }
        for (let i = 0; i < players.length; i++) {
            var randomIndex = Math.floor(rand()*bucket.length);
            randomIndex = bucket.splice(randomIndex, 1);
            let col = randomIndex % WIDTH;
            let row = Math.floor((randomIndex - col)/HEIGHT);
            let tank = new Tank(players[i][0], players[i][1], rand(), [row, col]);
            this._tanks[players[i][1]] = tank;
            this._array[row][col] = tank;
        }
        for (let i = 0; i < generators; i++) {
            var randomIndex = Math.floor(rand()*bucket.length);
            randomIndex = bucket.splice(randomIndex, 1);
            let col = randomIndex % WIDTH;
            let row = Math.floor((randomIndex - col)/HEIGHT);
            let generator =  new Generator([row, col]);
            this._generators = generator
            this._array[row][col] = generator;
        }
    }
}