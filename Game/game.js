var game;
var spieler;
var cursors;
var gameOptions = {
    tileSize : 25,
    tileSpacing : 0,
    boardSize : {
        //Reihen -> Y-Achse
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
        this.load.image("Bodenteil", "verwendeteImages/Block.jpg");
    
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
        var boden = this.physics.add.staticGroup();
        boden.create(25, 900, "Bodenteil");

        /*this.boardArray = [];
        for(var i = 0; i < gameOptions.boardSize.rows ; i++){
            this.boardArray[i] = [];
            for(var j = 0; j < gameOptions.boardSize.cols; j++){
                var tilePosition = this.getTilePosition(i,j);*/
                // this.add.image(tilePosition.x, tilePosition.y, "HintergrundBild");
                //Statt var tile -> var spieler

                // Spieler Position & Physik wird definiert : 
                spieler = this.physics.add.sprite(25, 850, "SpriteSheetLinkeseite", 0);
                spieler.setBounce(0.3);
                spieler.setCollideWorldBounds(true);

                this.anims.create({
                    key : "left",
                    frames : this.anims.generateFrameNumbers("SpriteSheetLinkeseite", { start : 0, end : 2 }),
                    frameRate : 10,
                     repeat : -1
                });
                this.anims.create({
                    key : "turn",
                    frames : [{key : "SpriteSheetLinkeseite", frame : 3}],
                    frameRate : 20,
                });
                this.anims.create({
                    key : "right",
                    frames : this.anims.generateFrameNumbers("SpriteSheetLinkeseite", { start : 4, end : 6 }),
                    frameRate : 10,
                     repeat : -1
                });

                cursors = this.input.keyboard.createCursorKeys();
                this.physics.add.collider(spieler, boden);


/* Unterschied zwischen unvisible und transparent: 
* -> Transparent wurde gerendert, nimmt auch Platz ein, mann kann es nur nicht sehen.
   -> Unvisible wurde garnicht gerändert. */
    update(){
        // Wie siehts aus mit Switch-Case statt if-Bedingungen?
        if(cursors.left.isDown){
            spieler.setVelocityX(-10);
            spieler.anims.play("left", true);
        }
        else if(cursors.right.isDown){
            spieler.setVelocityX(10);
            spieler.anims.play("right", true);
        }
        else{
            spieler.setVelocityX(0);
            spieler.anims.play("turn");
        }
        //console.log(spieler.y);
        // Wenn Spieler Taste dückt && Wenn Figur auf definierten Boden steht
        if(cursors.up.isDown && (spieler.body.touching.down ||spieler.y == 865) ){
            spieler.setVelocityY(-330);
        }
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
