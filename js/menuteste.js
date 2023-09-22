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
backgroundLayer1.src = '/Imagens Paralaxx par menu/m4/1.png';

const backgroundLayer2 = new Image();
backgroundLayer2.src = '/Imagens Paralaxx par menu/m4/2.png';

const backgroundLayer3 = new Image();
backgroundLayer3.src = '/Imagens Paralaxx par menu/m4/3.png';

const layer1 = new Layer(backgroundLayer1, 0); //ceu
const layer2 = new Layer(backgroundLayer2, 0); // nuvem
const layer3 = new Layer(backgroundLayer3, 0);//montanhas ao longe

const personagem = {
  x: 0,
  y: 0,
  width: 50, // Largura do personagem
  height: 50, // Altura do personagem
  color: 'blue', // Cor do personagem
};

const platforms = [];

// Configurações iniciais para cada plataforma
const numPlatforms = 3; // Número de plataformas
for (let i = 0; i < numPlatforms; i++) {
  const platform = {
    x: CANVAS_WIDTH + i * 150,
    y: Math.floor(Math.random() * 400) + 50,
    width: 100, // Largura da plataforma
    height: 10, // Altura da plataforma
    color: 'red', // Cor da plataforma
  };
  platforms.push(platform);
}

function drawPersonagem() {
  ctx.fillStyle = personagem.color;
  ctx.fillRect(personagem.x, personagem.y, personagem.width, personagem.height);
}

function drawPlatforms() {
  ctx.fillStyle = 'red'; // Cor das plataformas
  platforms.forEach((platform) => {
    ctx.fillStyle = platform.color;
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      personagem.y -= step;
      break;
    case 'ArrowDown':
      personagem.y += step;
      break;
    case 'ArrowLeft':
      personagem.x -= step;
      break;
    case 'ArrowRight':
      personagem.x += step;
      break;
  }
});

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  layer1.update();
  layer2.update();
  layer3.update();

  layer1.draw();
  layer2.draw();
  layer3.draw();

  drawPlatforms(); // Chama a função para desenhar as plataformas
  drawPersonagem(); // Chama a função para desenhar o personagem

  requestAnimationFrame(animate);
}

animate();
