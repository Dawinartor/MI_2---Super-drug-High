// Neue Scene namens LevelOne:
var gameScene = new Phaser.Scene('LevelOne');
// Scenen eigene Spiele Konfiguration:
var config = {
    type : Phaser.AUTO, // entscheidet selbst ob WebGL | Canvas verwendet werden soll.
    width : 400,
    height : 400,
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

class worldOne extends Phaser.Scene {

}