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

var starterArr = [];
var subArr = [];

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
                message: "What is your attack power? From 1-10:"
            }, {
                name: "defense",
                message: "What is your armor strength? From 1-10:"
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
        
    }
}

createPlayer();
