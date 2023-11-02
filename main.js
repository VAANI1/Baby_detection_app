img = "";
status_model = "";
objects = [];

function preload() {
 
}

function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(640, 420) ;
  video.hide(); 

}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting the baby";

}

function draw() {
  image(video, 0, 0, 640, 420);

  if (status_model != "") {
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status : Object Detected"; 
      document.getElementById("number_of_objects").innerHTML = "Number Of Baby : " + objects.length;       
      fill(r,g,b);
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      noFill();
      stroke(r,g,b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}

function modelLoaded() {
  console.log("cocossd model has loaded");
  status_model = true;
 
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  }
  else {
    console.log(results);
    objects = results;
  }
}
