var game;
var player;
var coursers; 
var gameOptions = {
    tileSize : 25,
    tileSpacing : 0,
    boardSize : {
        rows : 36, //Reihen -> Y-Achse
        cols : 36 //Spalten -> X-Achse
    },
    tweenSpeed: 20
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

//----------------------------------------

class bootGame extends Phaser.Scene {
    constructor () {
        super("BootGame");
    }

    preload() {
        this.load.image("HintergrundBild", "verwendeteImages/Background-Town.png");
        this.load.spritesheet("SpriteSheet","verwendeteImages/SpriteSheet/SpriteSheetHalf.png", {
            frameWidth : gameOptions.tileSize * 2,
            frameHeight : gameOptions.tileSize * 2.4
        });
    }

    create() {
        this.scene.start("PlayGame");
        console.log("Blub");
    }
}

//------------------------------------

class playGame extends Phaser.Scene {
    constructor () {
        super("PlayGame");
    }

    create() {
        this.add.image(450, 450, "HintergrundBild");
 
        player = game.add.sprite(32, 260, "SpriteSheet");
 
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
 
        player.animations.add("left", [0, 1, 2], 6, true);
        player.animations.add("right", [4, 5, 6], 6, true);
 
        this.cursors = game.input.keyboard.createCursorKeys();
        
    
    }

}

//-------------------------------------

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

var bild = document.getElementById
