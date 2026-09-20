let cenario;
let backmenu;
let jogador;
let menu;
let fonte;
let estadoJogo = "menu";
let spritesBotao = [];

let sprites = {
  baixo: [],
  cima: [],
  direita: [],
  esquerda: []
};

let cavaloSprites = {
  direita: [],
  esquerda: [],
  cima: [],
  baixo: []
};

let tempoInicioJogo;
let tempoUltimoSpawn = 0;
let maxCavalos = 8;
let cavalos = []
let servidor;
let servidorimg;

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
  backmenu = loadImage("Assets/cenário/menu.png");

  spritesBotao = [
    loadImage("Assets/botao_frames_jogar/botao_frame_1.png"),
    loadImage("Assets/botao_frames_jogar/botao_frame_2.png"),
    loadImage("Assets/botao_frames_jogar/botao_frame_3.png"),
    loadImage("Assets/botao_frames_jogar/botao_frame_4.png"),
    loadImage("Assets/botao_frames_jogar/botao_frame_5.png")
  ];


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

  cavaloSprites.direita = [
    loadImage("Assets/Cavalo_troia/direita/CT_parado.png"),
    loadImage("Assets/Cavalo_troia/direita/CT_passo1.png")
  ];

  cavaloSprites.cima = [
    loadImage("Assets/Cavalo_troia/cima/CT_cima_parado1.png"),
    loadImage("Assets/Cavalo_troia/cima/CT_cima_passo1.png")
  ];

  cavaloSprites.esquerda = [
    loadImage("Assets/Cavalo_troia/esquerda/CT_parado.png"),
    loadImage("Assets/Cavalo_troia/esquerda/CT_passo1.png"),
    loadImage("Assets/Cavalo_troia/esquerda/CT_passo2.png"),
    loadImage("Assets/Cavalo_troia/esquerda/CT_passo3.png")
  ];

  cavaloSprites.baixo = [
    loadImage("Assets/Cavalo_troia/baixo/CT_baixo_parado.png"),
    loadImage("Assets/Cavalo_troia/baixo/CT_baixo_passo1.png"),
    loadImage("Assets/Cavalo_troia/baixo/CT_baixo_passo2.png"),
    loadImage("Assets/Cavalo_troia/baixo/CT_baixo_passo3.png")
  ];

  servidorImg = loadImage("Assets/Servidor/Servidor_frame1.png");

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

  createCanvas(
    windowWidth,
    windowHeight
  );

  menu = new Menu(
    backmenu,
    spritesBotao,
    fonte
  );

  jogador = new Jogador(
    width / 2,
    height / 2,
    sprites
  );

  let locaisSpawn = [
    { x: 0, y: 240 },
    { x: width, y: 240 },
    { x: 709, y: 0 },
    { x: 709, y: height }
  ];

  let local = random(locaisSpawn);

  cavalos.push(
    new Inimigo(
      local.x,
      local.y,
      cavaloSprites
    )
  );

  servidor = new Servidor(
    709,
    240,
    servidorImg
  );
}

function criarCavalo() {

  let locaisSpawn = [
    { x: 0, y: 220},
    { x: 0, y: 240 },
    { x: 0, y: 260},
    { x: width, y: 220 },
    { x: width, y: 240 },
    { x: width, y: 260 },
    { x: 689, y: 0 },
    { x: 709, y: 0 },
    { x: 729, y: 0 },
    { x: 689, y: height },
    { x: 709, y: height },
    { x: 729, y: height }
  ];

  let local = random(locaisSpawn);

  cavalos.push(
    new Inimigo(
      local.x,
      local.y,
      cavaloSprites
    )
  );
}

function draw() {

  if (estadoJogo === "menu") {

    menu.mostrar();

  }

  else if (estadoJogo === "jogando") {

    jogar();

  }

  if (
    estadoJogo === "jogando" &&
    millis() - tempoInicioJogo >= 10000
  ) {

    if (
      millis() - tempoUltimoSpawn >= 5000 &&
      cavalos.length < maxCavalos
    ) {

      criarCavalo();

      tempoUltimoSpawn = millis();
    }

    for (let cavalo of cavalos) {

      cavalo.mover(servidor);
      cavalo.animar();
      cavalo.mostrar();
      cavalo.atacar(servidor);

    }
  }

}


function mousePressed() {

  if (estadoJogo === "menu") {

    if (menu.clicouJogar()) {

      estadoJogo = "jogando";
      tempoInicioJogo = millis();

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

    let hitboxServidor = servidor.serverHitbox();

    if (jogador.checarColisao(hitboxServidor)) {

      jogador.x = xAnterior;
      jogador.y = yAnterior;

    }


    if (jogador.checarColisao(hitboxPixels)) {

      jogador.x = xAnterior;
      jogador.y = yAnterior;

    }
  }


  jogador.animar();
  jogador.mostrar();
  jogador.mostrarVida();
  servidor.mostrar();
  servidor.mostrarVida();
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
