var grid = [ [0, 1, 1, 1, 0], [0, 2, 'M', 2, 0], [0, 2, 'M', 2, 0], [0, 1, 1, 1, 0],  [0, 0, 0, 0, 0], ];
class Cellule {
    constructor(){
        this.isFlagged = false;
        this.isRevealed = false;
    };
}

class Mine extends Cellule {
    constructor(string){
        super();
    }
}

class Nombre extends Cellule {
    constructor(value){
        super();
        this.valeur = value;
    }
}


class Demineur{
    constructor(){
        for (var i = 0; i < grid.length; i++) {
            const row = grid[i];
            for (var x = 0;  x < row.length; x++) {
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

    display() {
        // console.clear();
        var print = "\n";
        for (var i = 0; i < grid.length; i++) {
            const row = grid[i];
            for (var x = 0; x < row.length; x++) {
                var thisCase = row[x];
                if (thisCase.isFlagged === true && thisCase.isRevealed === false) {
                    print = print + "F ";
                }
                else if (thisCase.isFlagged === false && thisCase.isRevealed === true) {
                    print = print + "A ";
                }
                else if (thisCase.isFlagged === true && thisCase.isRevealed === true){
                    print = print + "F ";
                }
                else{
                    print = print + "⬛ ";
                }


            }
            print = print + "\n";
        }
        return console.log(print);
    }

    flag(x,y){
        grid[y][x].isFlagged = true;
        jeu.display();
    }

    click (x,y){
        console.clear();
        /*
            grid[0][0]       grid[0][4]

            grid[4][0]       grid[4][4]
         */
        if (x <= 4 && x >= 0 && y <=4 && y >= 0 ){
           if (grid[y][x].isRevealed !== true){
            if (grid[y][x].valeur === 0){
                grid[y][x].isRevealed = true;
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
        // else{
        //     console.log("Voici les valeurs pouvant être selectionnées :\n" +
        //         "[{0,0}, {1,0}, {2,0}, {3,0}, {4,0}]\n" +
        //         "[{0,1}, {1,1}, {2,1}, {3,1}, {4,1}]\n" +
        //         "[{0,2}, {1,2}, {2,2}, {3,2}, {4,2}]\n" +
        //         "[{0,3}, {1,3}, {2,3}, {3,3}, {4,3}]\n" +
        //         "[{0,4}, {1,4}, {2,4}, {3,4}, {4,4}]")
        // }

        // if (x === 0 && y ===0){
        //     jeu.plop(x+1,y);
        //     jeu.plop(x,y);
        //     jeu.plop(x,y+1);
        //     jeu.plop(x+1,y+1);
        // }
        // if (x === 0 && y ===4){
        //     jeu.plop(x,y-1);
        //     jeu.plop(x,y);
        //     jeu.plop(x+1,y-1);
        //     jeu.plop(x+1,y);
        // }
        // if (x === 4 && y === 0){
        //     jeu.plop(x-1,y+1);
        //     jeu.plop(x,y);
        //     jeu.plop(x-1,y);
        //     jeu.plop(x,y+1);
        // }
        // if (x === 4 && y === 4){
        //     jeu.plop(x,y-1);
        //     jeu.plop(x,y);
        //     jeu.plop(x-1,y);
        //     jeu.plop(x-1,y-1);
        // }

    }

    plop(x,y){
        if (grid[y][x].valeur === 0){
            grid[y][x].isRevealed = true;
        }
        else {
            console.log("pas egal a 0")
        }
    }
}


var jeu = new Demineur();
// jeu.display();
// jeu.flag(1,1);
jeu.click(0,0);
jeu.display();


//     [0, 1, 1, 1, 0]
//     [0, 2, 'M', 2, 0]
//     [0, 2, 'M', 2, 0]
//     [0, 1, 1, 1, 0]
//     [0, 0, 0, 0, 0]
