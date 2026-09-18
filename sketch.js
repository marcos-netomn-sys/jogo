let cenario;
let backmenu;
let jogador;
let menu;
let fonte;
let estadoJogo = "menu";

let sprites = {
  baixo: [],
  cima: [],
  direita: [],
  esquerda: []
};


class Hitbox {

  constructor(x, y, largura, altura) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
  }

  mostrar() {
    noFill();
    stroke(255, 0, 0);

    rect(
      this.x * width,
      this.y * height,
      this.largura * width,
      this.altura * height
    );
  }
}


function preload() {

  cenario = loadImage("Assets/cenário/cenario.png");
  fonte = loadFont("Assets/font/PixelifySans-VariableFont_wght.ttf");
  backmenu = loadImage("Assets/cenário/menu.png" );

  

  sprites.baixo = [
    loadImage("Assets/Personagem/baixo/parado.png"),
    loadImage("Assets/Personagem/baixo/Passo1.png"),
    loadImage("Assets/Personagem/baixo/Passo2.png")
  ];

  sprites.cima = [
    loadImage("Assets/Personagem/cima/parado.png"),
    loadImage("Assets/Personagem/cima/passo1.png"),
    loadImage("Assets/Personagem/cima/passo2.png")
  ];

  sprites.direita = [
    loadImage("Assets/Personagem/direita/Parado.png"),
    loadImage("Assets/Personagem/direita/passo1.png"),
    loadImage("Assets/Personagem/direita/passo2.png")
  ];

  sprites.esquerda = [
    loadImage("Assets/Personagem/esquerda/Parado.png"),
    loadImage("Assets/Personagem/esquerda/passo1.png"),
    loadImage("Assets/Personagem/esquerda/passo2.png")
  ];
}


let hitboxes = [

  new Hitbox(0, 0, 0.05, 1),
  new Hitbox(0.95, 0, 0.05, 1),

  new Hitbox(0, 0, 1, 0.1),
  new Hitbox(0, 0.85, 1, 0.15),

  new Hitbox(0.075, 0.2, 0.075, 0.1),
  new Hitbox(0.85, 0.2, 0.075, 0.1),

  new Hitbox(0.06, 0.68, 0.075, 0.1),
  new Hitbox(0.86, 0.68, 0.075, 0.1)
];


function setup() {

  createCanvas(windowWidth, windowHeight);

  menu = new Menu();

  jogador = new Jogador(
    width / 2,
    height / 2,
    sprites
  );
}


function draw() {

  if (estadoJogo === "menu") {

    menu.mostrar();

  }

  else if (estadoJogo === "jogando") {

    jogar();

  }
}


function mousePressed() {

  if (estadoJogo === "menu") {

    if (menu.clicouJogar()) {

      estadoJogo = "jogando";

    }
  }
}


function jogar() {

  image(
    cenario,
    0,
    0,
    width,
    height
  );


  let xAnterior = jogador.x;
  let yAnterior = jogador.y;


  jogador.mover();


  for (let hitbox of hitboxes) {

    let hitboxPixels = {

      x: hitbox.x * width,
      y: hitbox.y * height,

      largura: hitbox.largura * width,
      altura: hitbox.altura * height

    };


    if (jogador.checarColisao(hitboxPixels)) {

      jogador.x = xAnterior;
      jogador.y = yAnterior;

    }
  }


  jogador.animar();

  jogador.mostrar();

  jogador.mostrarVida();
}


function keyPressed() {

  if (estadoJogo === "jogando") {

    if (key === "e" || key === "E") {

      jogador.receberDano(10);

    }
  }
}


function mostrarHitboxes() {

  for (let i = 0; i < hitboxes.length; i++) {

    hitboxes[i].mostrar();

  }
}


function windowResized() {

  resizeCanvas(
    windowWidth,
    windowHeight
  );
}