var game;
var abstandX;
var bgY = 450;
var bgX = 300;
var spieler;
var bodenStueck;
var cursors;
var hintergrund;
var cam;
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
    mapSize : {
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
        scene: [ bootGame, playGame, playGame1 ],
        physics : {
            default : 'arcade',
            arcade : {
                gravity : {y : 400},
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
        hintergrund = this.add.image(gameOptions.mapSize.bgX , gameOptions.mapSize.bgY, "HintergrundBild");
        //hintergrund
        bodenStueck = this.physics.add.staticGroup();
        this.bauePlatformX25();
        //this.bauePlatformRandom_X_Y();
        this.baueEinfachePlatformRandom();
      
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
            this.cameras.main.setBounds(0, 0, 420 * 2, 176);
            cam = this.cameras.main;
            //this.cameras.main.setScrollX(spieler, true, 0.08, 0.08);
            //this.camera.marginBottom.startsWith()
            //this.cameras.main.setZoom(9);
            cursors = this.input.keyboard.createCursorKeys();
            this.physics.add.collider(spieler, bodenStueck);
            this.cameras.main.setBounds(0, 0, gameOptions.mapSize.bgX, gameOptions.mapSize.bgY);
            this.cameras.main.startFollow(spieler);
        }


/* Unterschied zwischen unvisible und transparent: 
* -> Transparent wurde gerendert, nimmt auch Platz ein, mann kann es nur nicht sehen.
   -> Unvisible wurde garnicht gerändert. */
    update() {
        // Wie siehts aus mit Switch-Case statt if-Bedingungen?
        if(cursors.left.isDown){
            spieler.setVelocityX(-60);
            hintergrund.setScrollX+=1.5;
            spieler.anims.play("left", true);
        }
        else if(cursors.right.isDown){
            spieler.setVelocityX(60);
            cam.x-=0.5;
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
        if(spieler.x == 879){
            this.scene.start("PlayGame1");
        }
        else{
            console.log("SpasstPos");
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

    bauePlatformRandom_X_Y() {
       var positionY_boden = 0;
        var positionX_boden = 0;
        for (var X = 0; X < 4 ;X++) {
            for(var Y = 0; Y < 4 ; Y++) {
                positionY_boden += 75;
                positionX_boden += 50;
                bodenStueck.create(positionX_boden, positionY_boden, "Bodenteil")
            }
            console.log(abstandX);
        }
    }
        baueEinfachePlatformRandom() {
        let positionY_boden = 0;
        let positionX_boden = 0;
        var randomNummber;
            
        for ( let i = 0; i < 900; i += 50) {// i = Anzahl der Steine auf dem Feld. 
            randomNummber = Math.floor((Math.random() * 900) + 1);
           // positionX_boden += getRandomNummber();
          //  positionY_boden += getRandomNummber();
            if(randomNummber > 800 ){
                bodenStueck.create(i, randomNummber, "Bodenteil");
            }

        }
    }

  }

//----------ERZEUGE LEVEL 1-----------------------------------------------------------------------------------------------

class playGame1 extends Phaser.Scene {

    constructor () {
        super("PlayGame1");
    }


    create() {
        console.log("level1");
        hintergrund = this.add.image(gameOptions.mapSize.bgX , gameOptions.mapSize.bgY, "HintergrundBild");
        //hintergrund
        bodenStueck = this.physics.add.staticGroup();
        this.bauePlatformX25();
        //this.bauePlatformRandom_X_Y();
      
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
            this.cameras.main.setBounds(0, 0, 420 * 2, 176);
            cam = this.cameras.main;
            //this.cameras.main.setScrollX(spieler, true, 0.08, 0.08);
            //this.camera.marginBottom.startsWith()
            //this.cameras.main.setZoom(9);
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
            hintergrund.setScrollX+=1.5;
            spieler.anims.play("left", true);
        }
        else if(cursors.right.isDown){
            spieler.setVelocityX(60);
            cam.x-=0.5;
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
  

    bauePlatformRandom_X_Y() {
       var positionY_boden = 0;
        var positionX_boden = 0;
        for (var X = 0; X < 4 ;X++) {
            for(var Y = 0; Y < 4 ; Y++) {
                positionY_boden += 75;
                positionX_boden += 50;
                bodenStueck.create(positionX_boden, positionY_boden, "Bodenteil")
            }
            console.log(abstandX);
        }
    }

    baueEinfachePlatformRandom() {
        let positionY_boden = 0;
        let positionX_boden = 0;
        var randomNummber;
        for ( let i = 0; i < 300; i += 50) {// i = Anzahl der Steine auf dem Feld. 
            randomNummber = Math.floor((Math.random() * 900) + 1);
           // positionX_boden += getRandomNummber();
          //  positionY_boden += getRandomNummber();
            bodenStueck.create(i, randomNummber, "Bodenteil");
        }
    }

  /*  getRandomNummber() {
        //const minNummber = 10;
        const maxNummber = 890;
        var randomNummber = Math.floor((Math.random() * maxNummber) + 1);
        return randomNummber;
    }
*/
}


//-----------------------------------------------------------------------------------------------------------


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
