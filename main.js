
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
  gridSize:{x:25, y:25}});


let rad = (deg)=>deg*Math.PI/180;
let r = 0;
function loop(){
  r+=1;
  r = r%15;
  px.clear();
  for(let t = 0; t<=360; t+=5){
    px.drawPixel(Math.round(r*Math.cos(rad(t))), Math.round(r*Math.sin(rad(t))));
  }
  px.draw();
}


function animate(){
  if(paused) return;
  loop();
  setTimeout(animate, 100);
}
animate();