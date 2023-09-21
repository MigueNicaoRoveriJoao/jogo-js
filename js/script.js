const personagem = document.getElementById('personagem');
let posicaoHorizontal = 0;
let posicaoVertical = 0;
const step = 10;

function updatePersonagemPosition() {
  personagem.style.left = posicaoHorizontal + 'px';
  personagem.style.top = posicaoVertical + 'px';
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      posicaoVertical -= step;
      break;
    case 'ArrowDown':
      posicaoVertical += step;
      break;
    case 'ArrowLeft':
      posicaoHorizontal -= step;
      break;
    case 'ArrowRight':
      posicaoHorizontal += step;
      break;
  }

  updatePersonagemPosition();
});

/////////////////////////////////////////////////////////////////////FUNDO MEXENDO//////////////////////////////////////////////////////////////////////////
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 300;
const CANVAS_HEIGHT = canvas.height = 320;
let gameSpeed = 2;

const backgroundLayer1 = new Image();
backgroundLayer1.src = '/ImagensDaMontanha/m1/1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = '/ImagensDaMontanha/m1/2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = '/ImagensDaMontanha/m1/3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = '/ImagensDaMontanha/m1/4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = '/ImagensDaMontanha/m1/5.png';
const backgroundLayer6 = new Image();
backgroundLayer6.src = 'ImagensDaMontanha/m1/PRE_ORIG_SIZE.png';
let x = 100;
let x2 = 100;

class Layer{
  constructor(image, speedModifier){
  this.x = 0;
  this.y = 0;
  this.width = 2400;
  this.height = 700;
  this.x2 = this.width;
  this.image = image;
  this.speedModifier = speedModifier;
  this.speed = gameSpeed * this.speed;
    }
    update(){
      this.speed = gameSpeed * this.speedModifier;
      if(this.x <= this.width){
        this.x = this.width + this.x2 - this.speed;
      }
      if (this.x2 <= -this.width){
        this.x2 = this.width + this.x - this.speed;
      }
      this.x = Math.floor(this.x - this.speed);
      this.x2 = Math.floor(this.x2 - this.speed);
    }
      draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
  }

  const layer5 = new Layer(backgroundLayer5, 1);

function animate(){
  ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
  layer5.update();
  layer5.draw();
  requestAnimationFrame(animate);
};
animate();

/*
function animate(){
  ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(backgroundLayer3, x, 0);
  ctx.drawImage(backgroundLayer5, x2, 0);
  if(x < -2400) x = 2400 - gameSpeed;
  else x -= gameSpeed;

  if(x2 < -24) x2 = 2400 - gameSpeed;
  else x2 -= gameSpeed;
  
  requestAnimationFrame(animate);
*/