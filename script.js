function preload() {
    song = loadSound('Song.mp3');
}

function setup() {
    createCanvas(1000, 1000);
    song.loop(); // song is ready to play during setup() because it was loaded during preload
    background(0,255,0);
}

function mousePressed() {
    if ( song.isPlaying() ) { // .isPlaying() returns a boolean
        song.stop();
        background(255,0,0);
    } else {
        song.play();
        background(0,255,0);
    }
}
