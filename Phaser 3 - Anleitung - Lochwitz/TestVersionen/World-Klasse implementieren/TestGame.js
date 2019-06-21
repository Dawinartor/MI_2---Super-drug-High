// Neue Scene namens LevelOne:
var gameScene = new Phaser.Scene('LevelOne');
var gameSceneTwo = new Phaser.Scene('LevelTwo');
var gameSceneThree = new Phaser.Scene('LevelThree');
// Scenen eigene Spiele Konfiguration:
var config = {
    type : Phaser.AUTO, // entscheidet selbst ob WebGL | Canvas verwendet werden soll.
    width : 640,
    height : 320,
    scene : [gameScene, gameSceneTwo], // Checkmal ab ob du hier eine Änderung machst, zweite Gamescene
    physics : {
        default : 'arcade',
        arcade : {
            gravity : { y : 300 },
            debug : false
        }
    },
    audio : {
        mute : false,
        volumen : 1,
        rate : 1,
        detune : 0,
        seek : 0,
        loop : true,
        delay : 0
        
    }
};

// erstellt das Spiel und übergibt dem die Einstellungen:
var spiel = new Phaser.Game(config);
// map01 = Skyline, map02 = 
var map01, map02, map03, map04;
var tilesMario;
var player;
var camera;
var cursors;
var groundLayer, backgroundLayer;
// Drei verschiedene Arten von Collectables, um verschiedene Effekte zu realisieren:
var itemLayerOne, itemLayerTwo, itemLayerThree;
var item_Hanf, item_Kokain, item_Teile, item_Test;
var music;
// Später noch Score einbauen??
var text;
// Test ----
var tilesMario, tilesForrest, tilesCity_David, tilesCityTown;


// Initialisieren grundlegende Dinge, die im späteren Verlauf wichtig werden.
gameScene.init = function() {
    // Lege einen imaginären Key an:
    this.courserKey = null;

}


// Wir laden nun unsere Assets aus dem Ordner
gameScene.preload = function() {
  
    // Lade eine TileMap durch die, zuvor angelegte tilemapTiledJSON. 
    // Diese läd dann auch die PNG-Datei aus dem angegebenen Verzeichnis.

    // Lade neue TileMap für Skyline Map:
    this.load.tilemapTiledJSON('Skyline', 'Assets/Worlds/SkyLine/World_Skyline.json');
    // Lade neue TileMap für Forrest Map:
    //this.load.tilemapTiledJSON('Forrest', 'Assets/Worlds/Forrest/World_Forrest.json');
    // Lade neue TileMap für City_David Map:
    // this.load.tilemapTiledJSON('', '')
    // Lade neue TileMap für CityTown Map:
    // this.load.tilemapTiledJSON('', '')


    // Lade Tiles des Supermario Sprite_sheets:
    this.load.spritesheet('SuperMario_Tiles', 'Assets/Tiles/Supermario_TileSet.png', {frameWidth : 16, frameHeight : 16});

    // Lade Tiles aus Forrest_panorama JPG-Datei:
    //this.load.spritesheet('Forrest_Tiles', 'Assets/Tiles/Forrest_panorama.jpg', {frameWidth : 16, frameHeight : 16});

    // Lade Item Tiles:
    this.load.spritesheet('Item_Tiles', 'Assets/Items/Items_Sprite_sheet.png', {frameWidth : 25, frameHeight : 25});

    // lade Daten für den Spieler - Inklusive JASON File um Animation zu machen:
    this.load.spritesheet('Spieler_Normal', 'Assets/Player/Normal_Sheet/Sprite_sheet_new.png', {frameWidth : 27.8, frameHeight : 76});

    // Lade Musikdateien ins Spiel:
    this.load.audio('MenueSound', 'Assets/Music/Main_Menu.mp3');
    this.load.audio('HouseOfRaisingSun', 'Assets/Music/House_of_raising_sun.mp3');
    this.load.audio('Halelluja', 'Assets/Music/Halelleuja.mp3');
    this.load.audio('Country_Crack', 'Assets/Music/Country_Crack.mp3');

    // Test um atlas zu laden:
    
};


// Wird einmal gerufen um geladenes zu laden
    gameScene.create = function() {

   // Erzeuge einzelnde Maps:
    map01 = this.make.tilemap( { key : 'Skyline' } );

    //map02 = this.make.tilemap( { key : 'Forrest' } );

   // map03 = this.make.tilemap( { key : 'map' } );

  //  map04 = this.make.tilemap( { key : 'map' } );

    // <Name in Tiled>, <Name aus spritesheet>
   //tiles = map01.addTilesetImage('Supermario_Tileset' ,'SuperMario_Tiles');

   // Übergebe Tileset einer Map, an tiles-Variable:
    tilesMario = map01.addTilesetImage('Supermario_TileSet', 'SuperMario_Tiles');

     // Übergebe Tileset einer Map, an tiles-Variable:
    // tilesForrest = map01.addTilesetImage('Forrest_Tileset', 'Forrest_Tiles');

    // Tileset Items:
    //tilesItem = map02.addTilesetImage('Item','')

   

// -------------- Layer-Konfiguration für map01 ---------------

   // Um die Layer übereinander sehen zu können müssen diese von hinten nach vorne gecoded werden:
   // Erst der Hintergrund:
   // backgroundLayer = map01.createStaticLayer('Background', tilesMario, 0, 0);
  
   // Danach die Plattformen:
   // groundLayer = map01.createStaticLayer('Ground', tilesMario, 0, 0);
  
   // Andere Tiles wie Collectables:
   // itemLayerOne = map01.createStaticLayer('Collectable_Grey', tilesMario, 0, 0 );
   // itemLayerTwo = map01.createStaticLayer('Collectable_Green', tilesMario, 0, 0);
   // itemLayerThree = map01.createStaticLayer('Collectable_Red', tilesMario, 0, 0);

    // Mit welchem Layer <hier groundLayer> Soll der Player Kollidieren
   // groundLayer.setCollisionByExclusion( [-1] );

   // Setzten wir Limits, damit der Spieler nicht über die Ränder hinaus laufen kann
  // this.physics.world.bounds.width = groundLayer.width;
  // this.physics.world.bounds.height = groundLayer.height;

   // -------------- Layer-Konfiguration für map01 ---------------
/****  Die map01 wird gerade von der, darunter stehenden Map02, überschrieben. Deswegen sieht mann nur map02 in HTML ****/
   // -------------- Layer-Konfiguration für map02 ---------------

    // Um die Layer übereinander sehen zu können müssen diese von hinten nach vorne gecoded werden:
   // Erst der Hintergrund:
    backgroundLayer = map01.createStaticLayer('Background', tilesMario, 0, 0);
   // Danach die Plattformen:
    groundLayer = map01.createStaticLayer('Ground', tilesMario, 0, 0);

    
    item_Hanf = map01.findObject('Items', obj => obj.name === 'dope');

    item_Test = this.physics.add.sprite(item_Hanf.x, item_Hanf.y, "Item_Tiles", 0);
    item_Test.setCollideWorldBounds(true);

// Funtktion effekt Item:

    this.physics.add.collider(item_Test, groundLayer);
    this.physics.add.overlap(player, item_Test, this.item_Effekt, null, this);

  // this.physics.add.overlap(player, item_Test, item_HanfEffekt, null, this);



   // Spreche ObjektEbene der Tiles an: (Probiere auf beiden grund-Layern die Items)
  // item_Hanf.setCollisionByProperty( { collider : true} );
    
   

    // Mit welchem Layer <hier groundLayer> Soll der Player Kollidieren
    groundLayer.setCollisionByExclusion( [-1] );

   // Setzten wir Limits, damit der Spieler nicht über die Ränder hinaus laufen kann
   this.physics.world.bounds.width = groundLayer.width;
   this.physics.world.bounds.height = groundLayer.height;

    // -------------- Layer-Konfiguration für map02 ---------------

   // Erzeuge Spieler für unser Spiel:
   // player = 
    player = this.physics.add.sprite(1650, 500, 'Spieler_Normal');
    player.setBounce( 0.2 ) //Player will bounce from items
    player.setCollideWorldBounds(true); // Damit der Spieler nicht außerhalb der Map gehen kann.


    // Eine Animation erzeugen: ** Geht das auch effizienter? **
    this.anims.create({
        key : 'left',
        frames : this.anims.generateFrameNumbers('Spieler_Normal', { start : 0, end : 1}),
        frameRate : 10,
        repeat : -1
    });

    this.anims.create({
        key : 'right',
        frames : this.anims.generateFrameNumbers('Spieler_Normal', { start : 3, end : 4}),
        frameRate : 10,
        repeat : -1
    });

    this.anims.create({
        key : 'stay',
        frames : [{ key : 'Spieler_Normal', frame : 2}],
        frameRate : 20, // ** Warum wird ein einzelnes Frame öffter geupdatet als zwei hintereinander??? **
    });


/* // Bessere Alternative???
    this.anims.create( {
        key : 'walk',
        frames : this.anims.generateFrameNames( 'player', { prefix : 'walkLeft', start : 0, ende : 1, zeroPad : 2 } ),
        frameRate: 10,
        repeat : -1
    } );
*/


   // Gib an, dass der SPieler mit dem Grund Kollidieren kann:
   this.physics.add.collider(groundLayer, player);
   this.physics.add.collider(groundLayer, item_Teile);



    // Kamera Einstellungen
    
    camera = this.cameras.main.startFollow(player, true, 0.4, 0.4);
    //
    camera.setBackgroundColor('#FF00FF');
    //camera.startFollow(player);
   this.cameras.main.setBounds(0, 0, 2721, 925);
    // Hintergrundfarbe der Kamera
   this.cameras.main.setBackgroundColor('#FF00FF');


    // Die im initial() angelegte Variable, wird nun zugewiesen:
    courserKey = this.input.keyboard.createCursorKeys();
    // -> ** courserKey muss in initial() zuvor angelegt werden! **

    // Array um Musikdateien nach und nach abzuspielen
   // music = new Array(5);
   // Füge Musikdateien in das Array:
  //  music[0] = this.sound.add('MenueSound');
  //  music[1] = this.sound.add('HouseOfRaisingSun');
  //  music[2] = this.sound.add('Halelluja');

    // Mache Musik loop draus:
  //  music[1].setLoop(true);
    // Musik wird abgespielt:
   // music[1].play();

}

// Nun lassen wir die Berechnungen immer wieder passieren, baer was soll berechnet werden?
//  -> Diese Methode wird jedes Frame aufs neue aufgerufen. Also 60x pro Sekunde.
gameScene.update = function () {

// In der Update-Abfrage nach Position des Spieler Fragen -> Je nach Level wir ander Musik gespielt.
/*
    if ( player.x >= 2650 || (player.x > 2650 && player.y > 800 ) ) {
        //music[1].play();
        console.log("spiele Musik1");
        
    } else {
        //music[2].play();
        console.log("spiele Musik2");
    }
*/
   
    //Wir prüfen auf Aktivität:
  if ( courserKey.left.isDown ) { // Laufe nach links

       player.body.setVelocityX(-80);
       player.anims.play('left', true);
    
   } else if ( courserKey.right.isDown ) { // Laufe nach rechts

       player.body.setVelocityX(80);
       player.anims.play('right', true);
    
   }else {
        player.body.setVelocityX(0);
        player.anims.play('stay', true);
    }
    if ( (courserKey.space.isDown || courserKey.up.isDown) && player.body.onFloor() ) {
        // Springe bei Leertaste | Pfeil nach oben
       player.body.setVelocityY(-400);
       player.anims.play('stay', true);
    }
    if(player.x >= 2700){
        this.scene.start(gameSceneTwo);
     //   music[1].stop();
    }
    

}

// Zum Testen:
setInterval(getPlayerPos, 4000);

function getPlayerPos() {
    console.log("X - Achse: " + player.x + " - " + "Y - Achse: " + player.y );
}
  
// Funtktion effekt Item:
function item_Effekte(player, item_Test) {
    item_Test.disableBody(true,true);
}

//------------------------------------------------------------------------------------------------------------------------

gameSceneTwo.init = function() {
    // Lege einen imaginären Key an:
    this.courserKey = null;

}


// Wir laden nun unsere Assets aus dem Ordner
gameSceneTwo.preload = function() {
  
    // Lade eine TileMap durch die, zuvor angelegte tilemapTiledJSON. 
    // Diese läd dann auch die PNG-Datei aus dem angegebenen Verzeichnis.

    // Lade neue TileMap für Skyline Map:
    this.load.tilemapTiledJSON('Skyline', 'Assets/Worlds/SkyLine/World_Skyline.json');
    // Lade neue TileMap für Forrest Map:
    this.load.tilemapTiledJSON('Forrest', 'Assets/Worlds/Forrest/World_Forrest.json');
    // Lade neue TileMap für City_David Map:
    // this.load.tilemapTiledJSON('', '')
    // Lade neue TileMap für CityTown Map:
    // this.load.tilemapTiledJSON('', '')


    // Lade Tiles des Supermario Sprite_sheets:
    this.load.spritesheet('SuperMario_Tiles', 'Assets/Tiles/Supermario_TileSet.png', {frameWidth : 16, frameHeight : 16});

    // Lade Tiles aus Forrest_panorama JPG-Datei:
    this.load.spritesheet('Forrest_Tiles', 'Assets/Tiles/Forrest_panorama.jpg', {frameWidth : 16, frameHeight : 16});

    // Lade Item Tiles:
    this.load.spritesheet('Item_Tiles', 'Assets/Items/Items_Sprite_sheet.png', {frameWidth : 25, frameHeight : 25});

    // lade Daten für den Spieler - Inklusive JASON File um Animation zu machen:
    this.load.spritesheet('Spieler_Normal', 'Assets/Player/Normal_Sheet/Sprite_sheet_new.png', {frameWidth : 25, frameHeight : 78});

    // Lade Musikdateien ins Spiel:
    this.load.audio('MenueSound', 'Assets/Music/Main_Menu.mp3');
    this.load.audio('HouseOfRaisingSun', 'Assets/Music/House_of_raising_sun.mp3');
    this.load.audio('Halelluja', 'Assets/Music/Halelleuja.mp3');
    this.load.audio('Country_Crack', 'Assets/Music/Country_Crack.mp3');

};


// Wird einmal gerufen um geladenes zu laden
    gameSceneTwo.create = function() {

   // Erzeuge einzelnde Maps:
    //map01 = this.make.tilemap( { key : 'Skyline' } );

    map02 = this.make.tilemap( { key : 'Forrest' } );

   // map03 = this.make.tilemap( { key : 'map' } );

  //  map04 = this.make.tilemap( { key : 'map' } );

    // <Name in Tiled>, <Name aus spritesheet>
   //tiles = map01.addTilesetImage('Supermario_Tileset' ,'SuperMario_Tiles');

   // Übergebe Tileset einer Map, an tiles-Variable:
    tilesMario = map02.addTilesetImage('Supermario_TileSet', 'SuperMario_Tiles');

     // Übergebe Tileset einer Map, an tiles-Variable:
     tilesForrest = map02.addTilesetImage('Forrest_Tileset', 'Forrest_Tiles');

    // Tileset Items:
    //tilesItem = map02.addTilesetImage('Item','')

   

// -------------- Layer-Konfiguration für map01 ---------------

   // Um die Layer übereinander sehen zu können müssen diese von hinten nach vorne gecoded werden:
   // Erst der Hintergrund:
   // backgroundLayer = map01.createStaticLayer('Background', tilesMario, 0, 0);
  
   // Danach die Plattformen:
   // groundLayer = map01.createStaticLayer('Ground', tilesMario, 0, 0);
  
   // Andere Tiles wie Collectables:
   // itemLayerOne = map01.createStaticLayer('Collectable_Grey', tilesMario, 0, 0 );
   // itemLayerTwo = map01.createStaticLayer('Collectable_Green', tilesMario, 0, 0);
   // itemLayerThree = map01.createStaticLayer('Collectable_Red', tilesMario, 0, 0);

    // Mit welchem Layer <hier groundLayer> Soll der Player Kollidieren
   // groundLayer.setCollisionByExclusion( [-1] );

   // Setzten wir Limits, damit der Spieler nicht über die Ränder hinaus laufen kann
  // this.physics.world.bounds.width = groundLayer.width;
  // this.physics.world.bounds.height = groundLayer.height;

   // -------------- Layer-Konfiguration für map01 ---------------
/****  Die map01 wird gerade von der, darunter stehenden Map02, überschrieben. Deswegen sieht mann nur map02 in HTML ****/
   // -------------- Layer-Konfiguration für map02 ---------------

    // Um die Layer übereinander sehen zu können müssen diese von hinten nach vorne gecoded werden:
   // Erst der Hintergrund:
    backgroundLayer = map02.createStaticLayer('Background', tilesForrest, 0, 0);
   // Danach die Plattformen:
    groundLayer = map02.createStaticLayer('Ground', tilesMario, 0, 0);
    // Items im Spiel:
    //items = map02.createObjectLayer('Hanf', tilesMario, 0, 0);
    item_Hanf = map02.findObject( 'Item_Hanf', obj => obj.name === 'Hanf_2' );
    items = this.physics.add.sprite(item_Hanf.x, item_Hanf.y, "Item_Tiles", 0);
    
   // this.physics.add.collider(player, groundLayer);
   
    


    // Mit welchem Layer <hier groundLayer> Soll der Player Kollidieren
    groundLayer.setCollisionByExclusion( [-1] );
    

   // Setzten wir Limits, damit der Spieler nicht über die Ränder hinaus laufen kann
   this.physics.world.bounds.width = groundLayer.width;
   this.physics.world.bounds.height = groundLayer.height;

    // -------------- Layer-Konfiguration für map02 ---------------

   // Erzeuge Spieler für unser Spiel:
   // player = 
    player = this.physics.add.sprite(500, 500, 'Spieler_Normal');
    player.setBounce( 0.2 ) //Player will bounce from items
    player.setCollideWorldBounds(true); // Damit der Spieler nicht außerhalb der Map gehen kann.


    // Eine Animation erzeugen: ** Geht das auch effizienter? **
    this.anims.create({
        key : 'left',
        frames : this.anims.generateFrameNumbers('Spieler_Normal', { start : 0, end : 1}),
        frameRate : 10,
        repeat : -1
    });

    this.anims.create({
        key : 'right',
        frames : this.anims.generateFrameNumbers('Spieler_Normal', { start : 3, end : 4}),
        frameRate : 10,
        repeat : -1
    });

    this.anims.create({
        key : 'stay',
        frames : [{ key : 'Spieler_Normal', frame : 2}],
        frameRate : 20, // ** Warum wird ein einzelnes Frame öffter geupdatet als zwei hintereinander??? **
    });


/* // Bessere Alternative???
    this.anims.create( {
        key : 'walk',
        frames : this.anims.generateFrameNames( 'player', { prefix : 'walkLeft', start : 0, ende : 1, zeroPad : 2 } ),
        frameRate: 10,
        repeat : -1
    } );
*/


   // Gib an, dass der SPieler mit dem Grund Kollidieren kann:
   this.physics.add.collider(groundLayer, player);


    // Kamera Einstellungen
    
    camera = this.cameras.main.startFollow(player, true, 0.4, 0.4);
    //
    camera.setBackgroundColor('#FF00FF');
    //camera.startFollow(player);
   this.cameras.main.setBounds(0, 0, 2721, 925);
    // Hintergrundfarbe der Kamera
   this.cameras.main.setBackgroundColor('#FF00FF');


    // Die im initial() angelegte Variable, wird nun zugewiesen:
    courserKey = this.input.keyboard.createCursorKeys();
    // -> ** courserKey muss in initial() zuvor angelegt werden! **

    // Array um Musikdateien nach und nach abzuspielen
    music = new Array(5);
    //Füge Musikdateien in das Array:
    music[0] = this.sound.add('MenueSound');
    music[1] = this.sound.add('HouseOfRaisingSun');
    music[2] = this.sound.add('Halelluja');

    // Mache Musik loop draus:
    // music.setLoop(true);
    // Musik wird abgespielt:
    music[2].play();

}


// Nun lassen wir die Berechnungen immer wieder passieren, baer was soll berechnet werden?
//  -> Diese Methode wird jedes Frame aufs neue aufgerufen. Also 60x pro Sekunde.
gameSceneTwo.update = function () {

// In der Update-Abfrage nach Position des Spieler Fragen -> Je nach Level wir ander Musik gespielt.
/*
    if ( player.x >= 2650 || (player.x > 2650 && player.y > 800 ) ) {
        //music[1].play();
        console.log("spiele Musik1");
        
    } else {
        //music[2].play();
        console.log("spiele Musik2");
    }
*/


    //Wir prüfen auf Aktivität:
  if ( courserKey.left.isDown ) { // Laufe nach links

       player.body.setVelocityX(-80);
       player.anims.play('left', true);
    
   } else if ( courserKey.right.isDown ) { // Laufe nach rechts

       player.body.setVelocityX(80);
       player.anims.play('right', true);
    
   }else {
        player.body.setVelocityX(0);
        player.anims.play('stay', true);
    }
    if ( (courserKey.space.isDown || courserKey.up.isDown) && player.body.onFloor() ) {
        // Springe bei Leertaste | Pfeil nach oben
       player.body.setVelocityY(-400);
       player.anims.play('stay', true);
    }
   
    

}


// *** Einfach den Collider auf der Grünen Wiese legen ***