
var grid = [ [0, 1, 1, 1, 0], [0, 2, '💣', 2, 0], [0, 2, '💣', 2, 0], [0, 1, 1, 1, 0],  [0, 0, 0, 0, 0], ];
var colors = require('colors/safe');
var scanf = require('scanf');

// la grille du démineur :
//     [0, 1, 1, 1, 0]
//     [0, 2, 'M', 2, 0]
//     [0, 2, 'M', 2, 0]
//     [0, 1, 1, 1, 0]
//     [0, 0, 0, 0, 0]

class Cellule {
    constructor(){
        this.isFlagged = false;
        this.isRevealed = false;
    };
}

class Mine extends Cellule { // herite de Cellule
    constructor(string){
        super();
        this.valeur="M";
    }
}

class Nombre extends Cellule { // herite de Cellule
    constructor(value){
        super();
        this.valeur = value;
    }
}


class Demineur{
    constructor(){
        this.win = false;
        this.loose = false;
        for (var i = 0; i < grid.length; i++) { //décomposition grid en row
            const row = grid[i];
            for (var x = 0;  x < row.length; x++) { //décomposition row en case
                var thisCase = row[x];
                if (isNaN(row[x]) === true){
                    row[x] = new Mine(thisCase);
                }
                if (!isNaN(row[x]) === true){
                    row[x] = new Nombre(thisCase);
                }
            }
        }
    }

    display() { // affiche la grille du démineur
        var print = "\n";
        for (var i = 0; i < grid.length; i++) { //décomposition grid en row
            const row = grid[i];
            for (var x = 0; x < row.length; x++) { //décomposition row en case
                var thisCase = row[x];
                if (thisCase.isFlagged === true && thisCase.isRevealed === false) {
                    print = print + " [" + colors.red("F") + "] ";
                }
                else if (thisCase.isFlagged === false && thisCase.isRevealed === true) {
                    print = print + " ["+ colors.blue(thisCase.valeur) + "] ";
                }
                else if (thisCase.isFlagged === true && thisCase.isRevealed === true){
                    print = print + " [" + colors.red("F") + "] ";
                }
                else{
                    print = print + " [" + colors.grey("⬛") + "] ";
                }

            }
            print = print + "\n\n";
        }
        return console.log(print);
    }

    flag(x,y){ // Placer un drapeau pour proteger une case (eviter de selectionner la case par inadvertance)
        grid[y][x].isFlagged = !grid[y][x].isFlagged;
        jeu.display();
    }


    click (x,y){ // selectionner une case
        console.clear();
        /*
            grid[0][0]       grid[0][4]

            grid[4][0]       grid[4][4]
         */
        if (x <= 4 && x >= 0 && y <=4 && y >= 0 ){
            if (grid[y][x].isRevealed !== true && grid[y][x].isFlagged === false){
                grid[y][x].isRevealed = true;
                if (grid[y][x].valeur === 0){
                    this.click(x,y+1);
                    this.click(x+1,y+1);
                    this.click(x+1,y);
                    this.click(x+1,y-1);
                    this.click(x,y-1);
                    this.click(x-1,y-1);
                    this.click(x-1,y);
                    this.click(x-1,y+1);
                }
            }
        }
    }

    start() { // Menu et lancement du jeu
        console.clear();
        console.log(colors.rainbow(" __    __     _                          \n" +
            "/ / /\\ \\ \\___| | ___ ___  _ __ ___   ___ \n" +
            "\\ \\/  \\/ / _ \\ |/ __/ _ \\| '_ ` _ \\ / _ \\\n" +
            " \\  /\\  /  __/ | (_| (_) | | | | | |  __/\n" +
            "  \\/  \\/ \\___|_|\\___\\___/|_| |_| |_|\\___|\n"));
        jeu.display();
        while(!jeu.win && !jeu.loose){
            console.log(colors.blue('C -> Click \n'));
            console.log(colors.red('F -> Flag\n'));
            console.log(colors.green('D -> Display\n'));
            var valueNext = scanf('%s');
            if (valueNext === "C") {
                console.log('\nEntrer x');
                var xValue = scanf('%d');
                console.log('\nEntrer y');
                var yValue = scanf('%d');
                jeu.click(xValue, yValue);
                jeu.display();
                jeu.testWin();
            }
            if (valueNext === "F") {
                console.log('Entrer x');
                const xValueFlag = scanf('%d');
                console.log('Entrer y');
                const yValueFlag = scanf('%d');
                jeu.flag(xValueFlag, yValueFlag);
            }
            if (valueNext === "D") {
                console.clear();
                jeu.display();
            }
        }
    }

    testWin(){ // Test si  vous avez gagner ou non
        var thisCellVal = true;
        var mineIsRevealed = false;
        for (var i = 0; i < grid.length; i++) { // décomposition grid en row
            var row = grid[i];
            for (var j = 0; j < row.length; j++) { //décomposition row en case
                var thisCase = row[j];
                if (!thisCase.isRevealed && thisCase.valeur !== "M"){
                    thisCellVal=false;
                }
                else if (thisCase.isRevealed && thisCase.valeur === "M"){
                    mineIsRevealed = true;
                }
            }
        }

        if(thisCellVal){
            this.win = true;
            console.clear();
            console.log(colors.rainbow("   ____                     __ \n" +
                "  / ___| __ _  __ _ _ __   /_/ \n" +
                " | |  _ / _` |/ _` | '_ \\ / _ \\\n" +
                " | |_| | (_| | (_| | | | |  __/\n" +
                "  \\____|\\__,_|\\__, |_| |_|\\___|\n" +
                "              |___/            "));
        }
        else if(mineIsRevealed){
            this.loose = true;
            console.clear();
            console.log(colors.red("  ____              _       \n" +
                " |  _ \\ ___ _ __ __| |_   _ \n" +
                " | |_) / _ \\ '__/ _` | | | |\n" +
                " |  __/  __/ | | (_| | |_| |\n" +
                " |_|   \\___|_|  \\__,_|\\__,_|\n" +
                "                            "));
        }
    }
}


var jeu = new Demineur();
jeu.start();
jeu.display();

