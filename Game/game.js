var game;
var gameOptions = {
   // Was muss für unser JumpNRun hier rein?
    }


window.onload = function() {

    var gameConfig = {
        width: 900,
        height: 900,
        background: 0xffaaff,
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