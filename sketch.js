/*
Data and machine learning for artistic practice
Portfolio Piece 4 - CRAWL

Takes a clip from the film RINGU and applies a artistic style to the video, 
then plays the stylised video on top of the origial

*/

let style1,
    video,
    img,
    graphics;

function setup() {
  createCanvas(320, 240);

  // Load the video for conversion

  video = createVideo("sada.mp4",cameraReady);
  video.size(320, 240);
  video.volume(0);
  video.loop();
  video.hide();
  
  
  // create graphics, you can image this like a second canvas, only invisible
  graphics = createGraphics(320, 240);
}

function cameraReady(stream) {
  // load in the style transfer model
  style1 = ml5.styleTransfer("models/mathura", modelLoaded);
}

function modelLoaded() {
  // model loaded
  console.log("Model loaded");
   
  // start the transfer of style
  transferStyle();
}

function transferStyle() {
  // we transfer based on graphics, graphics contains a scaled down video feed
  style1.transfer(graphics, function(err, result) {
    let tempDOMImage = createImg(result.src).hide();
    img = tempDOMImage;
    tempDOMImage.remove(); // remove the temporary DOM image
    
    // recursively call function so we get live updates
    transferStyle();
  });
}

function draw(){
  // Switch between showing the raw camera or the style
  if (img) {
    image(img, 0, 0, 320, 240);
  }
    
  // Applies the original video over the generated images and makes it transparent
  tint(255, 125);
  image(video, 0, 0, 320, 240);
    
  // this puts the video feed into the invisible graphics canvas
  graphics.image(video, 0, 0, 320, 240);
}