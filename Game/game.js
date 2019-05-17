var game;
var gameOptions = {
   tileSize : 25,
   tileSpacing : 0,
   boardSize : {
       rows : 36, //Reihen -> Y-Achse
       cols : 36 //Spalten -> X-Achse
   }
}


window.onload = function() {
console.log("ESEL");
    var gameConfig = {
        width: gameOptions.boardSize.cols * (gameOptions.tileSize + gameOptions.tileSpacing) + gameOptions.tileSpacing,
        height: gameOptions.boardSize.rows * (gameOptions.tileSize + gameOptions.tileSpacing) + gameOptions.tileSpacing,
        backgroundColor: 0xff0000,
        scene: [ bootGame, playGame ]
    }

    game = new Phaser.Game(gameConfig);
    window.focus();
    resizeGame();
    window.addEventListener("resize", resizeGame);

}


class bootGame extends Phaser.Scene {
    constructor () {
        super("BootGame");
    }

    preload() {
        // Die Skyline -> Hintergrund der geladen wird.
        this.load.image("HintergrundBild", "verwendeteImages/Background-Town.png");
    
    }

    create() {
        this.scene.start("PlayGame");
    }
}

class playGame extends Phaser.Scene {
    constructor () {
        super("PlayGame");
    }
    create() {
        for(var i = 0; i < gameOptions.boardSize.rows ; i++){
            for(var j = 0; j < gameOptions.boardSize.cols; j++){
                var tilePosition = this.getTilePosition(i,j);
                this.add.image(tilePosition.x, tilePosition.y, "HintergrundBild");
                this.add.image(tilePosition.x, tilePosition.y, " ");
            }
        }
    }
    getTilePosition(row, col){
        /*var posX = gameOptions.tileSpacing * (col + 1) + gameOptions.tileSize * (col + 0.5);
        var posY = gameOptions.tileSpacing * (row + 1) + gameOptions.tileSize * (row + 0.5);
        return new Phaser.Geom.Point(posX, posY);
        */
    }
}

function resizeGame() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    // ** Wo ist game.config? ** -> config ist eine Eigenschaft der game.
    var gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    } else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}