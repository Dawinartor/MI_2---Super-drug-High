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
        width: 900,
        height: 900,
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
        this.load.image("SpriteSheet","Assets/Sprites/SpriteSheet"); // Sprite-Sheet 
    
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
      this.add.image(450, 450, "HintergrundBild");
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