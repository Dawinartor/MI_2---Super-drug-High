// Diese Funktion lässt das gesammte Spiel laden, wenn wir das Fenster laden.
var game;
// Globale-Variable um die Spiel-Einstellungen zu speichern.
var gameOptions = {
    tileSize : 200,
    tileSpacing : 20,
    boardSize : { // Weiteres Objetk mit Ausgangspunk für Zeilen & Spalten.
        rows : 4,
        cols : 4
    }
}

window.onload = function() {

    var gameConfig = {
        width: 900, // Bei 800 px war kein Platz zwischen den Fliesen. -> Ergänzung in playGame.create()
        height: 900,
        backgroundColor: 0x0affa00, // Schwarz!
        scene: [ bootGame, playGame ] // Eine Sammlung von Scenen innerhalb des keys: scene.
                                      // Werden die hier angegeben, so werden sie auch initialisiert!
    }

    game = new Phaser.Game(gameConfig);
    window.focus();
    resizeGame();
    window.addEventListener("resize", resizeGame);
}

// Ein weiterer Konstruktor für die Klasse bootGame, dessen Objekt in scene auf ArrayPlatz [0] aufgerufen wird.
class bootGame extends Phaser.Scene {
    constructor () {
        super("BootGame");
    }

    preload() { // preload: Damit lassen wir unser Bild erzeugen.
        this.load.image("Fliese", "assets/sprites/Fliese2.png"); // Erwartet zwei Parameter -> Fliese ist das Bild, dann der Pfad zum Bild.
    }

    create() {
        console.log("The Game is loading");
        this.scene.start("PlayGame"); // Mit dieser Methode lassen wir die, als Parameter übergebene, Scene starten.
    }
}

// Hier steht der Konstruktor für die Klasse playGame -> Welche in gameConfig in scence erzeugt wird.
class playGame extends Phaser.Scene {
    constructor () {
        super("PlayGame"); // Der Name der Scene
    }
    create() { // Die create-Methode wwird verwendet sobald ein Objekt von playGame erzeugt wurde.
        // bestimmt Anker der Fiese auf Y-Achse
        for(let y = 0; y < 4; y++){ 
            // bestimmt Anker der Fiese auf X-Achse
            for(let x = 0; x < 4; x++){
                // this.add.image(x-Koordinate, y-Koordinate, "key"). add-> Weil bereits geladen (load).
                this.add.image(120 + x * 220, 120 + y * 220, "Fliese");
            }
        }
        // Die for-Schleife setzt die Fliesen nebeneinander, ganz automatisch!
        console.log("This is my awesome game");
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