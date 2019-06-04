var game;
var item0;
var item1;
var item2;
var abstandX;
var spieler;
var bodenStueck;
var cursors;
var hintergrund;
var cam;
var items;
var gameOptions = {
    tileSize : 25,
    tileSpacing : 0,
    boardSize : {
        maxHeight : 900, // Um die Welt zu definieren
        maxWidth : 2700, // Um die Welt zu definieren
        //Reihen -> Y-Achse
        height : 36, //Reihen -> Y-Achse
        width : 36 //Spalten -> X-Achse
    },
    mapSize : {
        bgY : 450,
        bgX : 1 
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
        // Items zum einsammeln
        this.load.image("itemblau", "verwendeteImages/Items/Item-blau.png");
        this.load.image("Itemgruen","verwendeteImages/Items/Item-gruen.png");
        this.load.image("Itemrot","verwendeteImages/Items/Item-rot.png");
        this.load.spritesheet("SpriteSheetLinkeseite","verwendeteImages/SpriteSheet/junky_normal sprite-sheet.png", {
            frameWidth : gameOptions.SinglePlayerFrame.playerWidth, // X-Wert
            frameHeight : gameOptions.SinglePlayerFrame.playerHeight // Y-Wert
        }); 
        // Sprite-Sheet 
       // this.load.image("red", "verwendeteImages/Items/Fliese2.png");
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
        //hintergrund wird erzeugt
        hintergrund = this.add.image(gameOptions.mapSize.bgX , gameOptions.mapSize.bgY, "HintergrundBild");
        //boden wird erzeugt
        bodenStueck = this.physics.add.staticGroup();
        // Item wird Physik hinzugefügt
        item0 = this.physics.add.group({
            key : 'itemblau',
            repeat : 3,
            setXY : { 
                x : 12,
                y : 0,
                stepX : 90
                    }
        });

        item1 = this.physics.add.group({
            key : 'Itemrot',
            repeat : 2,
            setXY : { 
                x : 12,
                y : 0,
                stepX : 180
                    }
        });

        item2 = this.physics.add.group({
            key : 'Itemgruen',
            repeat : 3,
            setXY : { 
                x : 12,
                y : 0,
                stepX : 270
                    }
        });



      
        // Spieler Position & Physik wird definiert : 
        spieler = this.physics.add.sprite(25, 850, "SpriteSheetLinkeseite", 0);
        spieler.setBounce(0.3);
        spieler.setCollideWorldBounds(true);
        // Item als platzierbarer Gegenstand in der Welt
        item0.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            child.setCollideWorldBounds(true);
            child.setScale(0.5);
        });

        item1.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            child.setCollideWorldBounds(true);
            child.setScale(0.5);
        });

        item2.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            child.setCollideWorldBounds(true);
            child.setScale(0.5);
        });



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
            // Item wird als Objekt definiert
          
            items = this.physics.add.group({
            key: 'red',
            repeat: 0,
            setXY: { x: 200, y: 0, stepX: 100 }
            });
          
            

            //this.items.allowDrag = true;
        
            this.cameras.main.startFollow(spieler, true, 0.08, 0.08);
            this.cameras.main.setBounds(0, 0, 900 * 2, 176);
            cam = this.cameras.main;
            //this.cameras.main.setScrollX(spieler, true, 0.08, 0.08);
            //this.camera.marginBottom.startsWith()
            //this.cameras.main.setZoom(9);
            cursors = this.input.keyboard.createCursorKeys();
            // ?? *************************************** ??
            this.physics.add.collider(items, bodenStueck);
            // ?? *************************************** ??
            // Items werden Collisionsabfrage hinzugefügt
            this.physics.add.collider(item0, bodenStueck);
            this.physics.add.collider(item1, bodenStueck);
            this.physics.add.collider(item2, bodenStueck);
            this.physics.add.collider(spieler, bodenStueck);
            // Möglichkeit wird hinzugefügt, dass Spieler das Item einsammeln kann 
            this.physics.add.overlap(spieler, item0, this.sammelItem, null, this);
            this.physics.add.overlap(spieler, item1, this.sammelItem, null, this);
            this.physics.add.overlap(spieler, item2, this.sammelItem, null, this);
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
            hintergrund.setScrollX += 1.5;
            spieler.anims.play("left", true);
        }

        else if(cursors.right.isDown){
            spieler.setVelocityX(10);
            hintergrund.x -= 0.5;
            item0.setVelocityX(-10);
            item1.setVelocityX(-10);
            item2.setVelocityX(-10);
            spieler.anims.play("right", true);
        }

        else {
         // items.setVelocityX(0);
            item0.setVelocityX(0);
            item1.setVelocityX(0);
            item2.setVelocityX(0);
            spieler.setVelocityX(0);
            spieler.anims.play("turn");
        }
        //console.log(spieler.y);
        // Wenn Spieler Taste dückt && Wenn Figur auf definierten Boden steht
        if(cursors.up.isDown && (spieler.body.touching.down || spieler.y == 865) ){
            spieler.setVelocityY(-330);
        }
        if(spieler.x == 878  && spieler.y > 400 && spieler.y < 500){
            this.scene.start("PlayGame1");
        }
        else{
           // console.log("SpasstPos : " + spieler.x + " " + spieler.y);
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


        baueEinfachePlatformRandom() {
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

    bauePlatformMitParameter(anzahlBloecke) {
        // Schleife für x-Achse
        for (let x = 0; x < 900; x+= 70) {
            var randomNummber = Math.floor((Math.random() * 150) + 85);
            for (let y = 0; y < 900; y += randomNummber) {
                    bodenStueck.create(x, y, "Bodenteil");
                
            }
        }
    }


    sammelItem(spieler, item0) {
        item0.disableBody(true, true);
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
        bodenStueck = this.physics.add.staticGroup(); // Staticgroup unveränderbare Teile des Spiels
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
            this.cameras.main.setBounds(0, 0, 1350 * 2, 176);
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
        var randomNummber;
        for ( let i = 0; i < 300; i += 50) {// i = Anzahl der Steine auf dem Feld. 
            randomNummber = Math.floor((Math.random() * 900) + 1);
           // positionX_boden += getRandomNummber();
          //  positionY_boden += getRandomNummber();
            bodenStueck.create(i, randomNummber, "Bodenteil");
        }
    }

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
