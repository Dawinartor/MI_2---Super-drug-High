var game;
var spieler;
var gameOptions = {
    tileSize : 25,
    tileSpacing : 0,
    boardSize : {
        rows : 36, //Reihen -> Y-Achse
        cols : 36 //Spalten -> X-Achse
    },
    tweenSpeed : 2000, // Lässt das bild langsam kommen -> Alpha-wert
    SinglePlayerFrame : {
        playerWidth : 42,
        playerHeight : 70
    }
}



window.onload = function() {
    var gameConfig = {
        width: gameOptions.boardSize.cols * (gameOptions.tileSize + gameOptions.tileSpacing) + gameOptions.tileSpacing,
        height: gameOptions.boardSize.rows * (gameOptions.tileSize + gameOptions.tileSpacing) + gameOptions.tileSpacing,
        backgroundColor: 0xff0000,
        scene: [ bootGame, playGame ],
        physics : {
            default : 'arcade',
            arcade : {
                gravity : {y : 300},
                debug : false
            }
        }
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
        this.load.spritesheet("SpriteSheetLinkeseite","verwendeteImages/SpriteSheet/junky_normal sprite-sheet.png", {
            frameWidth : gameOptions.SinglePlayerFrame.playerWidth, // X-Wert
            frameHeight : gameOptions.SinglePlayerFrame.playerHeight // Y-Wert
        }); // Sprite-Sheet 
    
    }

    create() {
        this.scene.start("PlayGame");
        console.log("Blub");
        // TODO - Write Update scene
    }
}

class playGame extends Phaser.Scene {
    constructor () {
        super("PlayGame");
    }

    create() {
        this.add.image(450, 450, "HintergrundBild");
        this.boardArray = [];
        for(var i = 0; i < gameOptions.boardSize.rows ; i++){
            this.boardArray[i] = [];
            for(var j = 0; j < gameOptions.boardSize.cols; j++){
                var tilePosition = this.getTilePosition(i,j);
                // this.add.image(tilePosition.x, tilePosition.y, "HintergrundBild");
                //Statt var tile -> var spieler
                spieler = this.physics.add.sprite(25, 850, "SpriteSheetLinkeseite", 3);

                spieler.setCollideWorldBounds(true);

/* Unterschied zwischen unvisible und transparent: 
* -> Transparent wurde gerendert, nimmt auch Platz ein, mann kann es nur nicht sehen.
   -> Unvisible wurde garnicht gerändert. */
                spieler.visible = true;
                this.boardArray[i][j] = {
                    tileValue: 0,
                    tileSprite: spieler // Unsere Figur
                }
            }
        }
       // this.addTile();

    }

    getTilePosition(row, col){
        var posX = gameOptions.tileSpacing * (col + 1) + gameOptions.tileSize * (col + 0.5);
        var posY = gameOptions.tileSpacing * (row + 1) + gameOptions.tileSize * (row + 0.5);
        return new Phaser.Geom.Point(posX, posY);
    }
    
// Meine eigene Methode, um den Spieler zu bekommen
    getPlayerPosition(row, col) {
        var posX = gameOptions.tileSpacing * (col + 1) + gameOptions.tileSize * (col + 0.5);
        var  posY = gameOptions.tileSpacing * (row + 1) + gameOptions.tileSize * (row + 0.5);
        var rectangleWidth = gameOptions.tileSize * 2; // 50 px
        var rectangleheight = gameOptions.tileSize * 4; // 100 px
        return new Phaser.Geom.Rectangle(posX, posY, rectangleWidth, rectangleheight); // Rechteck wird erzeugt -> Unser Spieler.

    }

/*
    addTile(){
        var emptyTiles = [];
        for(var i = 0; i < gameOptions.boardSize.rows; i++){
            for(var j = 0; j < gameOptions.boardSize.cols; j++){
                if(this.boardArray[i][j].tileValue == 0){
                    // True, wenn boardArray i == 0, j == 0
                    emptyTiles.push({ 
                    // Koordinaten des neuen Tiles
                        row: i,
                        col: j
                    })
                }
            }
        }
        if(emptyTiles.length > 0){
            var chosenTile = Phaser.Utils.Array.GetRandom(emptyTiles);
            this.boardArray[chosenTile.row][chosenTile.col].tileValue = 1;
            this.boardArray[chosenTile.row][chosenTile.col].tileSprite.visible = true;
            this.boardArray[chosenTile.row][chosenTile.col].tileSprite.setFrame(0);
            this.boardArray[chosenTile.row][chosenTile.col].tileSprite.alpha = 0;
            this.tweens.add({
                targets: [this.boardArray[chosenTile.row][chosenTile.col].tileSprite],
                alpha: 1,
                duration: gameOptions.tweenSpeed //Tween macht die Animation aus
            });
        }
        console.log(Phaser.Utils.Array.GetRandom(emptyTiles));
        }
*/

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
