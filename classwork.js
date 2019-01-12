var inquirer = require("inquirer");

function Player(name, position, offense, defense) {
    this.name = name;
    this.position = position;
    this.offense = offense;
    this.defense = defense;
    this.goodGame = function () { };
    this.badGame = function () { };
    this.printStats = function () {
        console.log("Name: " + this.name + "\nPosition: " + this.position +
            "\nOffense: " + this.offense + "\nDefense: " + this.defense);
    };
}

var count = 0;
var gameCount = 0;

var score = 0;
var starterArr = [];
var subArr = [];

function getRandomNumberOne() {
    return getRandomNumber(1,20);
};

function getRandomNumberTwo() {
    return getRandomNumber(1,20);
};
function createPlayer() {
    if (count < 3) {
        console.log("Create a new player:");
        inquirer.prompt([
            {
                name: "name",
                message: "What is your name?"
            }, {
                name: "position",
                message: "What is your current position?"
            }, {
                name: "offense",
                message: "What is your attack power? From 1-10:",
                default: "number"
            }, {
                name: "defense",
                message: "What is your armor strength? From 1-10:",
                default: "number"
            }
        ]).then(function (answers) {

            var newPlayer = new Player(
                answers.name,
                answers.position,
                answers.offense,
                answers.defense
            );

            if (count < 2) {
                starterArr.push(newPlayer);
                console.log(answers.name + " is now a starter!");
            }
            else {
                subArr.push(newPlayer);
                console.log(answers.name + " is now a sub!");
            }

            count++;
            createPlayer();
        });
    }
    else {
        console.log("These are your starters:: ");
        for (i = 0; i < starterArr.length; i++) {
            starterArr[i].printStats();
            console.log("----------------");
        }
        console.log("These are your subs:: ");
        for (i = 0; i < subArr.length; i++) {
            subArr[i].printStats();
            console.log("----------------");
        }
        playGame();
    }
}


function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random()*(max - min + 1)) + min;
}

function playGame() {
    if (gameCount < 5) {
        var randNumberOne = getRandomNumberOne();
        var randNumberTwo = getRandomNumberTwo();

        var offSum = 0;
        var defSum = 0;

        // console.log(randNumberOne);
        // console.log(randNumberTwo);

        for (var j = 0; j < starterArr.length; j++) {
            // console.log(starterArr[j].offense);
            offSum += parseInt(starterArr[j].offense);
        }
        // console.log(offSum);
        for (var d = 0; d < starterArr.length; d++) {
            defSum += parseInt(starterArr[d].defense);
        }
        // console.log(defSum);
        if (randNumberOne < offSum) {
            score++;
            console.log("You gained a point!  Score: " + score);
        } else {
            console.log("Your offense wasn't enough!");
        }
        if (randNumberTwo > defSum){
            score--;
            console.log("You lost a point!  Score: " + score);
        } else {
            console.log("Your defense wasn't enough!");
        }
        console.log("Your current score: " + score);
        gameCount++;
        playGame();
        
    }

}


createPlayer();
