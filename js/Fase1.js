const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 500;
let gameSpeed = 2;

// Classe Layer para o fundo
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

// Carregamento das imagens do fundo
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

// Arrays para armazenar as camadas de fundo
const layers = [
  new Layer(backgroundLayer1, 0.2), // céu
  new Layer(backgroundLayer2, 0.4), // nuvem
  new Layer(backgroundLayer3, 0.6), // montanha
  new Layer(backgroundLayer4, 1),   // chão de fundo
  new Layer(backgroundLayer5, 3)    // chão principal
];

// Variáveis de posição do personagem
let posicaoHorizontal = 10;
let posicaoVertical = 10;
const step = 10;

// Imagem do personagem
const personagem = new Image();
personagem.src = '/assets/personagem.png';

// Evento de carregamento do personagem
personagem.onload = function () {
  // Função para desenhar o personagem
  function desenharPersonagem() {
    ctx.drawImage(personagem, posicaoHorizontal, posicaoVertical, 65, 75); // Define a largura e altura do personagem
  }

  // Função para atualizar a posição do personagem
  function updatePersonagemPosition() {
    posicaoHorizontal = Math.max(posicaoHorizontal, 0);
    posicaoVertical = Math.max(posicaoVertical, 0);
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    layers.forEach(layer => layer.draw()); // Redesenhe todas as camadas de fundo
    desenharPersonagem();
  }

  // Event listener para capturar as teclas pressionadas
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

  // Função para animar o fundo
  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    layers.forEach(layer => layer.update()); // Atualize todas as camadas de fundo
    layers.forEach(layer => layer.draw());   // Redesenhe todas as camadas de fundo
    desenharPersonagem();
    requestAnimationFrame(animate);
  }

  // Inicie a animação
  animate();
};
