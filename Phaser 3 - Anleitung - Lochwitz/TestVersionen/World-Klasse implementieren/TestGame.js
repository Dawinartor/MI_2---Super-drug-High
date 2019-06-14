// Neue Scene namens LevelOne:
var gameScene = new Phaser.Scene('LevelOne');
// Scenen eigene Spiele Konfiguration:
var config = {
    type : Phaser.AUTO, // entscheidet selbst ob WebGL | Canvas verwendet werden soll.
    width : 2700, //window.innerWidth,
    height : 900, // window.innerHeight,
    scene : gameScene
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

gameScene.init = function() {
    // Lege einen imaginären Key an:
    this.courserKey = null;
}

// Wir laden nun unsere Assets aus dem Ordner
gameScene.preload = function() {
    // lade Daten für den Hintergrund:
    this.load.image('Level1', 'Assets/Worlds/CityLVL.jpg');
    // lade Daten für den Spieler:
    this.load.image('Spieler_Normal', 'Assets/Player/Sprite_sheet_normal.png');
    // lade Daten für Items:
    this.load.image('ItemOne', 'Assets/Items/ItemEins.jpg');
};

// Wird einmal gerufen um geladenes zu laden
gameScene.create = function() {
    // Sprite-center(Mitte) auf 0|0 gesetzt:
   var bg = this.add.sprite(0, 0, 'Level1');
   // Spieler geladen:
   var player = this.add.sprite(450, 80, 'Spieler_Normal');
   // Grafik Elemente lassen sich auch zommen -/+:
   //player.setScale(0.5);

  /*
   // Wir erstellen imaginäre Keys die für die Bestimmung der Richtungen sind.
   var pfeilTaste = this.input.keyboard.addKeys({
       hoch : 'hoch',
       runter : 'runter',
       links : 'links',
       rechts : 'rechts'
   }); // pfeilTaste.hoch, pfeilTaste.links
   // Ist gedrückt ?
   var isDown
 */

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



