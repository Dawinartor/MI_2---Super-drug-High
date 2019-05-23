var game;
var abstandX;
var bgY = 450;
var bgX = 300;
var spieler;
var bodenStueck;
var cursors;
var hintergrund;
var gameOptions = {
    tileSize : 25,
    tileSpacing : 0,
    boardSize : {
        maxHeight : 900, // Um die Welt zu definieren
        maxWidth : 900, // Um die Welt zu definieren
        //Reihen -> Y-Achse
        height : 36, //Reihen -> Y-Achse
        width : 36 //Spalten -> X-Achse
    },
    backgroundStay : {
        bgY : 450,
        bgX : 450 
    },
    SinglePlayerFrame : {
        playerWidth : 42,
        playerHeight : 70
    }

}




window.onload = function() {
    var gameConfig = {
        width: gameOptions.boardSize.width * (gameOptions.tileSize + gameOptions.tileSpacing) + gameOptions.tileSpacing,
        height: gameOptions.boardSize.height * (gameOptions.tileSize + gameOptions.tileSpacing) + gameOptions.tileSpacing,
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

// BootGame - Klasse -----------------------------------------------

class bootGame extends Phaser.Scene {
    constructor () {
        super("BootGame");
    }

    preload() {
        // Die Skyline -> Hintergrund der geladen wird.
        this.load.image("HintergrundBild", "verwendeteImages/Background-Town.png");
        this.load.image("Bodenteil", "verwendeteImages/Block.jpg");
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

// PlayGame - Klasse -----------------------------------------------

class playGame extends Phaser.Scene {

    constructor () {
        super("PlayGame");
    }


    create() {
        hintergrund = this.add.image(gameOptions.backgroundStay.bgX , gameOptions.backgroundStay.bgY, "HintergrundBild");
        //hintergrund
        bodenStueck = this.physics.add.staticGroup();
        this.bauePlatformX25();
      
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
            this.cameras.main.startFollow(spieler, true, 0.08, 0.08);
            this.cameras.main.setZoom(1);
            cursors = this.input.keyboard.createCursorKeys();
            this.physics.add.collider(spieler, bodenStueck);
        }

/* Unterschied zwischen unvisible und transparent: 
* -> Transparent wurde gerendert, nimmt auch Platz ein, mann kann es nur nicht sehen.
   -> Unvisible wurde garnicht gerändert. */
    update() {
        // Wie siehts aus mit Switch-Case statt if-Bedingungen?
        if(cursors.left.isDown){
            spieler.setVelocityX(-60);
            spieler.x-=2.5;
            spieler.anims.play("left", true);
        }
        else if(cursors.right.isDown){
            spieler.setVelocityX(60);
            spieler.x+=2.5;
            spieler.anims.play("right", true);
            
        }
        else{
            spieler.setVelocityX(0);
            spieler.anims.play("turn");
        }
        //console.log(spieler.y);
        // Wenn Spieler Taste dückt && Wenn Figur auf definierten Boden steht
        if(cursors.up.isDown && (spieler.body.touching.down || spieler.y == 865) ){
            spieler.setVelocityY(-330);
        }
     }

     bauePlatformX25() {
        abstandX = 0;
        for (var i = 0; i < 4; i++) {
            abstandX += gameOptions.tileSize;
            bodenStueck.create(abstandX, 850, "Bodenteil");
            console.log(abstandX);
        }
    }
/*
    bauePlatformRandom_X_Y() {
        for (var X = 0; X < gameOptions.boardSize.maxWidth;X += 25) {
            for(var Y = 0; Y < ) {

            }
            bodenStueck.create(abstandX, 850, "Bodenteil");
            console.log(abstandX);
        }
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
