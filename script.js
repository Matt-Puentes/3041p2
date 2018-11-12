var song;
var vol = 0;
var titleState = 100;
var lastDraw = 0;
var progressBarPos = 0;
var data;
var notesPlayed = [];
function preload() {
    song = loadSound('Note-Annoying.wav');
    song.playMode('restart');
    //song = loadSound('Note-Nice.wav');
}

function setup() {
    createCanvas(1000, 500);
    frameRate(100);
    textSize(40);
    data = getData();
}

function mousePressed() {
    titleState = 99;
    console.log();
}

function draw() {
    var dt = (millis() - lastDraw)/1000;
    var pixelsPerSecond = (width/data.length)/1
    var yRange = [-13,1];
    progressBarPos += pixelsPerSecond * dt
    if(titleState > 0){
        if(titleState != 100)
            titleState--;
        background("#9055A2");
        textAlign(CENTER);
        fill(46, 41, 78, (titleState/100) * 255);
        text("Has music been getting louder? Let's see...", width/2, 60);
        progressBarPos = 0
    }
    else if(titleState == 0){
        background("#D499B9")
        textAlign(CENTER);
        fill("#011638");
        text("Let's look at the volume of music over 84 years...", width/2, 50);
        x = (dt/100)*width
        line(progressBarPos, 0, progressBarPos, height)
        lineGraph(-13, 1, "Max Loud",data)

        var currPoint = Math.floor((progressBarPos/width) * (data.length - 1));
        if (!(currPoint in notesPlayed)){
            notesPlayed.push(currPoint);
            var volume = ((data[currPoint]["Max Loud"] - yRange[0])/(yRange[1] - yRange[0]))
            console.log(volume)
            song.play(0,1, volume ,0,2);
        }
        if(progressBarPos > width){
            titleState = -1;
        }
    } else {
        titleState -= 1;
        background("#9055A2");
        textAlign(CENTER);
        fill(46, 41, 78, (titleState/-100) * 255);
        text("See how terrible music has become?\nYou can help by texting 1-800-STOPPOP.", width/2, 60);
        progressBarPos = 0
    }
    lastDraw = millis();
}

function lineGraph(minY, maxY, yKey, points){
    var graphWidth = width;
    var graphHeight = height;
    var range = maxY-minY;
    var oldP = [NaN,NaN]
    for (point in points){
        var x = graphWidth*(point/(points.length - 1));
        var y = (((points[point][yKey] - minY)/range) * -height) + height
        var newP = [x,y]
        //draw the graph
        if(!isNaN(oldP[0])){
            fill("#011638");
            line(newP[0],newP[1],oldP[0],oldP[1])
        }
        fill(46, 41, 78);
        ellipse(newP[0], newP[1], 5, 5);
        var oldP = [x,y]
    }
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
