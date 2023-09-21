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
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 500;
let gameSpeed = 2;

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 500; // Ajuste a altura conforme necessário
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }

  update() {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = this.width;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width;
    }
    this.x -= this.speed;
    this.x2 -= this.speed;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

const backgroundLayer1 = new Image();
backgroundLayer1.src = '/ImagensDaMontanha/m2/1.png';

const backgroundLayer2 = new Image();
backgroundLayer2.src = '/ImagensDaMontanha/m2/2.png';

const backgroundLayer3 = new Image();
backgroundLayer3.src = '/ImagensDaMontanha/m2/3.png';

const backgroundLayer4 = new Image();
backgroundLayer4.src = '/ImagensDaMontanha/m2/4.png';


const backgroundLayer5 = new Image();
backgroundLayer5.src = '/ImagensDaMontanha/m2/5.png';


const backgroundLayer6 = new Image();
backgroundLayer6.src = '/ImagensDaMontanha/m2/6.png';


const backgroundLayer7 = new Image();
backgroundLayer7.src = '/ImagensDaMontanha/m2/7.png';


const layer1 = new Layer(backgroundLayer1, 0.2); //ceu
const layer2 = new Layer(backgroundLayer2, 0.3); // montanhas ao fundo
const layer3 = new Layer(backgroundLayer3, 0.7);//nuvem
const layer4 = new Layer(backgroundLayer4, 0.5); //montanha maior
const layer5 = new Layer(backgroundLayer5, 0.7); //montanha menor
const layer6 = new Layer(backgroundLayer6, 1);//grama
const layer7 = new Layer(backgroundLayer7, 1);//chão

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  layer1.update();
  layer2.update();
  layer3.update();
  layer4.update();
  layer5.update();
  layer6.update();
  layer7.update();
  layer1.draw();
  layer2.draw();
  layer3.draw();
  layer4.draw();
  layer5.draw();
  layer6.draw();
  layer7.draw();
  requestAnimationFrame(animate);
}

animate();