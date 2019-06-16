// Neue Scene namens LevelOne:
var gameScene = new Phaser.Scene('LevelOne');
// Scenen eigene Spiele Konfiguration:
var config = {
    type : Phaser.AUTO, // entscheidet selbst ob WebGL | Canvas verwendet werden soll.
    width : 2700, //window.innerWidth,
    height : 900, // window.innerHeight,
    scene : gameScene, // Checkmal ab ob du hier eine Änderung machst, zweite Gamescene
    physics : {
        default : 'arcade',
        arcade : {
            gravity : { y : 500 },
            debug : false
        }
    }
};
// erstellt das Spiel und übergibt dem die Einstellungen:
var spiel = new Phaser.Game(config);

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
    // lade Daten für den Hintergrund:
    this.load.image('Level1', 'Assets/Worlds/CityLVL.jpg');
    //Die Mapbezogenen Steine mit der tilemapTiledJSON-Methode laden:
    this.load.tilemapTiledJSON('map', 'Assets/Worlds/ErstesLevel.json');
    // lade Daten für den Spieler:
    this.load.image('Spieler_Normal', 'Assets/Player/Sprite_sheet_normal.png');
    // lade Daten um das Level zu gestallten
    this.load.image('MarioTiles', 'Assets/Items/Super_Mario_TileSet.png');
  
};


// Wird einmal gerufen um geladenes zu laden
gameScene.create = function() {
  
   const level_1 = [
    // Jeder Wert steht für eine bestimmte Position innerhalb des SuperMario_TileSet's
    [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
    [  0,   1,   2,   3,   0,   0,   0,   1,   2,   3,   0 ],
    [  0,   5,   6,   7,   0,   0,   0,   5,   6,   7,   0 ],
    [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
    [  0,   0,   0,  14,  13,  14,   0,   0,   0,   0,   0 ],
    [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
    [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
    [  0,   0,  14,  14,  14,  14,  14,   0,   0,   0,  15 ],
    [  0,   0,   0,   0,   0,   0,   0,   0,   0,  15,  15 ],
    [ 35,  36,  37,   0,   0,   0,   0,   0,  15,  15,  15 ],
    [ 39,  39,  39,  39,  39,  39,  39,  39,  39,  39,  39 ]
   ];

   // Hier werden die Daten des Levels in einer Variable festgehalten
   const map = this.make.tilemap({data : level_1, tileWidth : 16, tileHeight : 16})
   // Das Bild / TileSet aus dem geladen werden soll.
   const tiles = map.addTilesetImage("MarioTiles");
   // Das LAyer sagt an wie eine Welt aussieht, bzw welche Tiles in welcher Reihenfolge ausgelegt sind.
   const layer = map.createStaticLayer(0, tiles, 0, 0);
   
   // Sprite-center(Mitte) auf 0|0 gesetzt:
   var bg = this.add.sprite(0, 0, 'Level1');
   // Spieler geladen:
   var player = this.add.sprite(450, 80, 'Spieler_Normal');
   // Ein Level durch ein 2D Array erzeugen:

 // Die im initial() angelegte Variable, wird nun zugewiesen:
    courserKey = this.input.keyboard.createCursorKeys();
    // -> ** courserKey muss in initial() zuvor angelegt werden! **

/* Wie werden in Phaser 3 Images platziert?:
    1. Der Ausgangspunkt ist immer der Koordinaten-Ursprung 0|0. 
       Dieser liegt aber statt unten links, oben recht. 
       -> Also müssen wir die Ursprung des Assets verändern.*/

   // Verändere den Ursprung des Assets:
   bg.setOrigin(0,0);
}


// Nun lassen wir die Berechnungen immer wieder passieren, baer was soll berechnet werden?
//  -> Diese Methode wird jedes Frame aufs neue aufgerufen. Also 60x pro Sekunde.
gameScene.update = function () {

    //console.log();

    //Wir prüfen auf Aktivität:
  if ( courserKey.left.isDown ){
       console.log("Linke Pfeiltaste gedrückt");
   }
 
}



