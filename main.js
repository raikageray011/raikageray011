import { Board } from './board.js';

let players = ['a', 'b', 'c'];
let b = new Board('test3', players, 1);

b._array.forEach((item) => {
    console.log(item);
});