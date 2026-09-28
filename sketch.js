let cenario;
let backmenu;
let jogador;
let menu;
let fonte;
let estadoJogo = "menu";
let spritesBotao = [];
let logoFrames = [];
let musicaMenu;
let sprites = {
  baixo: [],
  cima: [],
  direita: [],
  esquerda: []
};
let tiros = [];

let cavaloSprites = {
  direita: [],
  esquerda: [],
  cima: [],
  baixo: []
};

let servidor;
let servidorImg;

let cavalos = [];
let tempoInicioJogo;
let tempoUltimoSpawn = 0;
let maxCavalos = 8;

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

  cenario = loadImage("Assets/cenário/Cenario.png");

  fonte = loadFont(
    "Assets/font/PixelifySans-VariableFont_wght.ttf"
  );

  backmenu = loadImage(
    "Assets/cenário/menu.png"
  );

  musicaMenu = loadSound(
  "Assets/audio/music_menu.mp3"
);

  logoFrames = [
  loadImage("Assets/logo/frame_1.png"),
  loadImage("Assets/logo/frame_2.png"),
  loadImage("Assets/logo/frame_3.png"),
  loadImage("Assets/logo/frame_4.png"),
  loadImage("Assets/logo/frame_5.png"),
  loadImage("Assets/logo/frame_6.png"),
  loadImage("Assets/logo/frame_7.png"),
  loadImage("Assets/logo/frame_8.png"),
  loadImage("Assets/logo/frame_9.png"),
  loadImage("Assets/logo/frame_10.png")
];
  spritesBotao = [
    loadImage("Assets/botao_frames_jogar/botao_frame_1_jogar.png"),
    loadImage("Assets/botao_frames_jogar/botao_frame_2_jogar.png"),
    loadImage("Assets/botao_frames_jogar/botao_frame_3_jogar.png"),
    loadImage("Assets/botao_frames_jogar/botao_frame_4_jogar.png"),
    loadImage("Assets/botao_frames_jogar/botao_frame_5_jogar.png")
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

  servidorImg = loadImage(
    "Assets/Servidor/Servidor_frame1.png"
  );
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
  logoFrames,
  fonte
);

  jogador = new Jogador(
    width / 2,
    height * 0.65,
    sprites
  );

  posicionarServidor();

  criarCavalo();
}

function posicionarServidor() {

  let xServidor =
    width * 0.50 - 60;

  let yServidor =
    height * 0.43 - 55;

  if (!servidor) {

    servidor = new Servidor(
      xServidor,
      yServidor,
      servidorImg
    );

  } else {

    servidor.x = xServidor;
    servidor.y = yServidor;

  }
}

function atirar() {
  let tiro = new Tiro(
    jogador.x + jogador.largura / 2,
    jogador.y + jogador.altura / 2,
    jogador.direcao
  );

  tiros.push(tiro);
}

function criarCavalo() {

  let locaisSpawn = [

    {
      x: 0,
      y: height * 0.27
    },

    {
      x: 0,
      y: height * 0.30
    },

    {
      x: 0,
      y: height * 0.33
    },

    {
      x: width,
      y: height * 0.27
    },

    {
      x: width,
      y: height * 0.30
    },

    {
      x: width,
      y: height * 0.33
    },

    {
      x: width * 0.47,
      y: 0
    },

    {
      x: width * 0.50,
      y: 0
    },

    {
      x: width * 0.53,
      y: 0
    },

    {
      x: width * 0.47,
      y: height
    },

    {
      x: width * 0.50,
      y: height
    },

    {
      x: width * 0.53,
      y: height
    }

  ];

  let local =
    random(locaisSpawn);

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

  } else if (estadoJogo === "jogando") {

    jogar();

    if (
      millis() - tempoInicioJogo >= 10000
    ) {

      if (
        millis() - tempoUltimoSpawn >= 5000 &&
        cavalos.length < maxCavalos
      ) {

        criarCavalo();

        tempoUltimoSpawn =
          millis();

      }

      for (let cavalo of cavalos) {

        cavalo.mover(
          servidor
        );

        cavalo.animar();

        cavalo.mostrar();

        cavalo.atacar(
          servidor
        );

      }
    }
  }
}

function mousePressed() {

  if (estadoJogo === "menu") {

    userStartAudio();

    if (!menu.clicouJogar()) {

      if (!musicaMenu.isPlaying()) {
        musicaMenu.setVolume(31);
        musicaMenu.loop();
      }

    } else {

      if (musicaMenu.isPlaying()) {
        musicaMenu.stop();
      }

      estadoJogo = "jogando";

      tempoInicioJogo = millis();
      tempoUltimoSpawn = millis();
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

  let xAnterior =
    jogador.x;

  let yAnterior =
    jogador.y;

  jogador.mover();

  let hitboxServidor =
    servidor.serverHitbox();

  if (jogador.checarColisao(hitboxServidor)) {

    jogador.x = xAnterior;
    jogador.y = yAnterior;

  }

  for (let hitbox of hitboxes) {

    let hitboxPixels = {

      x:hitbox.x * width,
      y:hitbox.y * height,
largura:hitbox.largura * width,
altura:hitbox.altura * height

    };

    if (jogador.checarColisao(hitboxPixels)) {
jogador.x = xAnterior;
jogador.y =yAnterior;
    }
  }

  servidor.mostrar();
  servidor.mostrarVida();
  jogador.animar();
  jogador.mostrar();
  jogador.mostrarVida();

  atualizarTiros();
}

function keyPressed() {
  if (estadoJogo === "jogando") {
    if (key === "e" || key === "E") {
      jogador.receberDano(5);
    }

    if (key === " ") {
      atirar();
    }
  }
}
function atualizarTiros() {
  for (let i = tiros.length - 1; i >= 0; i--) {
    tiros[i].mover();
    tiros[i].mostrar();

    if (tiros[i].saiuDaTela()) {
      tiros.splice(i, 1);
    }
  }
}
function mostrarHitboxes() {

  for (let i = 0;i < hitboxes.length;i++) {
  hitboxes[i].mostrar();
  }
}

function windowResized() {
  resizeCanvas(
    windowWidth,
    windowHeight
  );
  posicionarServidor();
}