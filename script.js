var song;
var vol = 0;
var fadeLevel = 100;
var demoState = 0;
var lastDraw = 0;
var progressBarPos;
var data;
var notesPlayed = [];
var yRange = [-13,1];
var songPlaying = false;

var pink = "#F99FC9"
var blue = "#ABCAE9"

var graphXpadding;
var graphYpadding;
var graphWidth;
var graphHeight;

function preload() {
    // song = loadSound('Note-Annoying.wav');
    song = loadSound('237.mp3');
    // song = loadSound('Note-Nice.wav');
    song.playMode('restart');
}

function setup() {
    createCanvas(1000, 500);
    frameRate(100);
    textSize(40);
    textAlign(CENTER);
    data = getData();

    graphXpadding = 100;
    graphYpadding = 70;
    graphWidth = width - (graphXpadding * 2);
    graphHeight = height - (graphYpadding * 2);
    progressBarPos = graphXpadding;
}

function mousePressed() {
    fadeLevel = 99;
}

function draw() {
    //This handles the timing for the progress bar
    if(demoState == 1){
        var dt = (millis() - lastDraw)/1000;
        var pixelsPerSecond = (graphWidth/data.length)/1;
        progressBarPos += pixelsPerSecond * dt;
    }

    //The "Title Screen"
    if(demoState == 0){
        //Have text fade out
        if(fadeLevel != 100)
            fadeLevel--;
        if(fadeLevel == 0)
            demoState = 1;

        //Draw text+background
        background(pink);
        fill(0, 50, 135, (fadeLevel/100) * 255);
        stroke(0, 50, 135, (fadeLevel/100) * 255);
        text("Has music been getting louder? Let's see...", width/2, 60);
    }
    //The "Graph Screen"
    else if(demoState == 1){
        if(!songPlaying){
            song.play(0,1,1,30,100);
            songPlaying = true
        }
        //Draw text+background
        background(pink);
        textAlign(CENTER);
        fill(0, 50, 135);
        text("Let's look at the volume of music over 84 years...", width/2, 50);

        //Draw Line Graph
        lineGraph(-13, 1, "Max Loud",data);
        //Draw Progress Bar
        stroke(0, 50, 135);
        line(progressBarPos, graphYpadding, progressBarPos, graphHeight + graphYpadding);

        //Calculate the current point based on the progress bar's position
        var currPoint = Math.floor(((progressBarPos - graphXpadding)/graphWidth) * (data.length - 1));
        // console.log(currPoint)
        // console.log(progressBarPos)
        // console.log(graphXpadding)
        // console.log(graphWidth)
        // console.log(((progressBarPos - graphXpadding)/graphWidth))
        // console.log("---------")
        //If this point hasn't had its note played yet, play it
        if (!(currPoint in notesPlayed)){
            notesPlayed.push(currPoint);
            //Calculate volume based on data
            var volume = ((data[currPoint]["Max Loud"] - yRange[0])/(yRange[1] - yRange[0]));
            var masterVol = ((Math.pow(100,(currPoint/data.length))-1)/75)+.20
            print(masterVol)
            masterVolume(masterVol)
        }
        if(progressBarPos > graphWidth+graphXpadding){
            demoState = 2;
        }
    }
    //The "Ending Screen"
    else {
        //have the text fade in
        if(fadeLevel < 100)
            fadeLevel += 1;

        //Draw text+background
        background(pink);
        fill(0, 50, 135, (fadeLevel/100) * 255);
        stroke(0, 50, 135, (fadeLevel/100) * 255);
        text("See how terrible music has become?\nYou can help by texting 1-800-STOPPOP.", width/2, 60);
    }
    lastDraw = millis();
}

function lineGraph(minY, maxY, yKey, points){
    stroke(0, 0, 0);
    var range = maxY-minY;
    var oldP = [NaN,NaN];
    for (point in points){
        var x = graphWidth*(point/(points.length - 1)) + graphXpadding;
        var y = (((points[point][yKey] - minY)/range) * - graphHeight) + graphHeight + graphYpadding;
        var newP = [x,y]
        //draw the lines
        if(!isNaN(oldP[0])){
            fill(0, 50, 135);
            line(newP[0],newP[1],oldP[0],oldP[1])
        }
        //draw the points
        //fill(46, 41, 78);
        fill(0, 50, 135)
        ellipse(newP[0], newP[1], 5, 5);

        var oldP = [x,y]
    }
    line(graphXpadding, graphHeight + graphYpadding, width - graphXpadding, graphHeight + graphYpadding)
    line(0 + graphXpadding, graphYpadding, 0 + graphXpadding, height - graphYpadding)
}

function getData() {
    var raw_JSON = [
          {
            "year": 1928,
            "Average Loud": -17.357875,
            "Count": 2,
            "Min Loud": -24.106,
            "Max Loud": -11.383
          },
          {
            "year": 1936.25,
            "Average Loud": -19.250125,
            "Count": 1.5,
            "Min Loud": -30.53,
            "Max Loud": -10.697
          },
          {
            "year": 1951,
            "Average Loud": -14.416187500000001,
            "Count": 2,
            "Min Loud": -26.997,
            "Max Loud": -7.96
          },
          {
            "year": 1956.5,
            "Average Loud": -13.371892857142857,
            "Count": 3.75,
            "Min Loud": -23.549,
            "Max Loud": -6.555
          },
          {
            "year": 1960.5,
            "Average Loud": -13.140874007936507,
            "Count": 7.25,
            "Min Loud": -23.611,
            "Max Loud": -5.176
          },
          {
            "year": 1964.5,
            "Average Loud": -11.733277403846154,
            "Count": 12,
            "Min Loud": -25.924,
            "Max Loud": -5.074
          },
          {
            "year": 1968.5,
            "Average Loud": -12.071477368458627,
            "Count": 22.5,
            "Min Loud": -23.977,
            "Max Loud": -2.969
          },
          {
            "year": 1972.5,
            "Average Loud": -11.56362878787879,
            "Count": 23.75,
            "Min Loud": -28.946,
            "Max Loud": -3.97
          },
          {
            "year": 1976.5,
            "Average Loud": -11.210138988095238,
            "Count": 23.5,
            "Min Loud": -27.885,
            "Max Loud": -3.471
          },
          {
            "year": 1980.5,
            "Average Loud": -11.474199756944445,
            "Count": 38.5,
            "Min Loud": -41.691,
            "Max Loud": -3.028
          },
          {
            "year": 1984.5,
            "Average Loud": -11.500342153568226,
            "Count": 37.5,
            "Min Loud": -38.525,
            "Max Loud": -2.339
          },
          {
            "year": 1988.5,
            "Average Loud": -11.296689419812882,
            "Count": 60.75,
            "Min Loud": -30.285,
            "Max Loud": -2.246
          },
          {
            "year": 1992.5,
            "Average Loud": -11.698711725593247,
            "Count": 107.5,
            "Min Loud": -51.643,
            "Max Loud": -3.349
          },
          {
            "year": 1996.5,
            "Average Loud": -10.44602427030544,
            "Count": 131.25,
            "Min Loud": -36.835,
            "Max Loud": -2.198
          },
          {
            "year": 2000.5,
            "Average Loud": -8.999518368621967,
            "Count": 196.25,
            "Min Loud": -38.148,
            "Max Loud": -1.479
          },
          {
            "year": 2004.5,
            "Average Loud": -8.590768384802708,
            "Count": 287,
            "Min Loud": -32.166,
            "Max Loud": -1.545
          },
          {
            "year": 2008.5,
            "Average Loud": -8.050946790949396,
            "Count": 213,
            "Min Loud": -33.662,
            "Max Loud": 0.566
          }
        ]
    return raw_JSON;
}
