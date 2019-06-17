// Neue Scene namens LevelOne:
var gameScene = new Phaser.Scene('LevelOne');
// Scenen eigene Spiele Konfiguration:
var config = {
    type : Phaser.AUTO, // entscheidet selbst ob WebGL | Canvas verwendet werden soll.
    width : 2720,
    height : 928,
    scene : gameScene, // Checkmal ab ob du hier eine Änderung machst, zweite Gamescene
    physics : {
        default : 'arcade',
        arcade : {
            gravity : { y : 300 },
            debug : false
        }
    }
};

// erstellt das Spiel und übergibt dem die Einstellungen:
var spiel = new Phaser.Game(config);

var map;
var tiles;
var player;
var cursors;
var groundLayer, backgroundLayer, collectables;
// Später noch Score einbauen??
var text;

/* Scene life-Cycle: 
    1. inti(): Wird eine Scene gestartetn dann wird init() aufgerufen.
    - Nächster Schritt -
    2. preload(): Alle vorhandenen Daten/Grafiken werden mit diesem Call geladen
    - Nächster Schritt -
    3. create(): Die geladenen Daten werden platziert. Also alles
                 was nun geladen wurde bekommt seinen Platz im Spiel
    - Nächster Schritt / Während des Spiels laufender Schritt -
    4. update(): Dise Methode lässt das Spiel immer wieder updaten
                 also macht aus der Mathematik die hier drin steckt
                 ein immer wieder berechnendes Bild. 
                 Default ist es auf 60x pro Sekunde gestellt: 60 FPS

*/

// Initialisieren grundlegende Dinge, die im späteren Verlauf wichtig werden.
gameScene.init = function() {
    // Lege einen imaginären Key an:
    this.courserKey = null;

}


// Wir laden nun unsere Assets aus dem Ordner
gameScene.preload = function() {
  
    // Erzeuge eine TileMap durch die, zuvor angelegte tilemapTiledJSON:
    this.load.tilemapTiledJSON('map', 'Assets/Test02/SpielKarte.json');

    // Übergebe Tiles an Variable tiles:
    this.load.spritesheet('MarioTiles22', 'Assets/Tiles/Supermario_TileSet.png', {frameWidth : 16, frameHeight : 16});

    // lade Daten für den Spieler - Inklusive JASON File um Animation zu machen:
    this.load.spritesheet('Spieler_Normal', 'Assets/Player/Sprite_sheet_normal.png', {frameWidth : 25, frameHeight : 76});

};


// Wird einmal gerufen um geladenes zu laden
gameScene.create = function() {

   // Das ist die Map, die wie erzeugt haben:
   map = this.make.tilemap( { key : 'map'} );

   tiles = map.addTilesetImage('MarioTiles' ,'MarioTiles22');

   // Um die Layer übereinander sehen zu können müssen diese von hinten nach vorne gecoded werden:
   // Erst der Hintergrund:
    backgroundLayer = map.createStaticLayer('Hintergrund', tiles, 0, 0);
   // Danach die Plattformen:
    groundLayer = map.createStaticLayer('Plattform', tiles, 0, 0);
   // Andere Tiles wie Collectables:
    collectables = map.createStaticLayer('Items', tiles, 0, 0 );
    // Mit welchem Layer <hier groundLayer> Soll der Player Kollidieren
    groundLayer.setCollisionByExclusion( [-1] );


   // Setzten wir Limits, damit der Spieler nicht über die Ränder hinaus laufen kann
   this.physics.world.bounds.width = groundLayer.width;
   this.physics.world.bounds.height = groundLayer.height;


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
    this.cameras.main.setBounds(0, 0, 200, 200);

    this.cameras.main.startFollow(player);

    this.cameras.main.setBackgroundColor('#FF00FF');


    // Die im initial() angelegte Variable, wird nun zugewiesen:
    courserKey = this.input.keyboard.createCursorKeys();
    // -> ** courserKey muss in initial() zuvor angelegt werden! **

}


// Nun lassen wir die Berechnungen immer wieder passieren, baer was soll berechnet werden?
//  -> Diese Methode wird jedes Frame aufs neue aufgerufen. Also 60x pro Sekunde.
gameScene.update = function () {

    //console.log();

    //Wir prüfen auf Aktivität:
  if ( courserKey.left.isDown ) { // Laufe nach links

       player.body.setVelocityX(-80);
       player.anims.play('left', true);
       // console.log("links");
   } else if ( courserKey.right.isDown ) { // Laufe nach rechts

       player.body.setVelocityX(80);
       player.anims.play('right', true);
       // console.log("rechts");
   } else if ( (courserKey.space.isDown || courserKey.up.isDown) && player.body.onFloor() ) {
        // Springe bei Leertaste | Pfeil nach oben
       player.body.setVelocityY(-400);
       player.anims.play('stay', true);
       // console.log("Sprung");
   }
    else{
        player.body.setVelocityX(0);
        player.anims.play('stay', true);
    }

}
  



