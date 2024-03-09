// Excersise 1: Better scores
"use strict";

const scores = [5, 3, -5, -2, 10, 6, 9, 1, -2];
let NN = 0;

console.log("The scores: " + scores);

let pos_scores = []

// for (let i=0; i < scores.length; i++) {
//     if(scores[i] >= 0) {
//         pos_scores
//         i--;
//         NN++;
//     }
// }

for (let score of scores){
    if (score >= 0){
        pos_scores.push(score);
    }else {
        NN++;
    }
}

console.log("The positive scores: " + pos_scores);
console.log("Number of removed negative scores: " + NN);

for (let repeat = 0; repeat < 2; repeat++){
    let posmin = 0
    for (let i = 1; i<pos_scores.length; i++){
        if(pos_scores[i] < pos_scores[posmin]){
            posmin = i;
        }
    }
    pos_scores.splice(posmin, 1);
}

console.log("After removing the smallest two: " + pos_scores);

let sum = 0;
for (const score of pos_scores){
    sum += score;
}
let avg = Math.round(sum / pos_scores.length)
for (let repeat = 0; repeat< NN+2; repeat++){
    pos_scores.push(avg);
}

console.log("After adding NN + 2 of the average score: "+ pos_scores);
