
import './style.css'
import {Pixatron} from './src/Pixatron';

let [W,H] = [window.innerWidth, window.innerHeight];
let paused = false;
let $ = document.querySelector.bind(document);
let canv = $('#canv');
let ctx = canv.getContext('2d');
canv.width = H*0.9; 
canv.height = H*0.9;

let px = new Pixatron({context: ctx, canvas: canv, 
  gridSize:{x:50, y:50}});


let rad = (deg)=>deg*Math.PI/180;
let r = 0;


let squareCoords = 
[ [1,   1],
  [1,  -1],
  [-1, -1],
  [-1,  1] ];



function loop(){
  r+=1;
  r = r%15;
  px.clear();
  px.setFillColor('#fff');
  px.drawPixel(0,0);
  px.setFillColor("#f00");
  px.drawLine([0,0], [2,2])
  // px.connectDots(...squareCoords);
  px.render();
}


function animate(){
  if(paused) return;
  loop();
  // setTimeout(animate, 100);
}
animate();