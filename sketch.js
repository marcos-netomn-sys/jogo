
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
let bugs = [];

let tempoInicioJogo;
let tempoUltimoSpawn = 0;
let maxCavalos = 8;
let total_cavalos_criados = 0;

let maxBugs = 8;
let total_bugs_criados = 0;
let tempoUltimoSpawnBug = 0;

let roundAtual = 1;
let estadoRound = "jogando";
let tempoTransicaoRound = 0;

let plantinha;

// MAPEAMENTO DOS FRAMES DO BUG
let mapeamentoBug = {
  direita: {
    frames: [
      { x: 10, y: 300 },
      { x: 380, y: 300 },
      { x: 710, y: 300 },
      { x: 1060, y: 300 },
      { x: 1410, y: 300 }
    ],
    frameWidth: 350,
    frameHeight: 320
  },

  esquerda: {
    frames: [
      { x: 20, y: 320 },
      { x: 370, y: 320 },
      { x: 730, y: 320 },
      { x: 1060, y: 320 },
      { x: 1420, y: 320 }
    ],
    frameWidth: 350,
    frameHeight: 320
  },

  baixo: {
    frames: [
      { x: 330, y: 10 },
      { x: 330, y: 315 },
      { x: 345, y: 620 },
      { x: 335, y: 925 },
      { x: 330, y: 1230 }
    ],
    frameWidth: 360,
    frameHeight: 320
  },

  cima: {
    frames: [
      { x: 350, y: 10 },
      { x: 350, y: 310 },
      { x: 350, y: 620 },
      { x: 350, y: 935 },
      { x: 350, y: 1240 }
    ],
    frameWidth: 320,
    frameHeight: 310
  }
};

let bugSprites = {};
let animacoesBug = {};

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

function preload() {
  cenario = loadImage("Assets/cenário/Cenario.png");

  fonte = loadFont(
    "Assets/font/PixelifySans-VariableFont_wght.ttf"
  );

  backmenu = loadImage("Assets/cenário/menu.png");

  musicaMenu = loadSound("Assets/audio/music_menu.mp3");

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

  // Sprites do jogador
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

  // Sprites dos cavalos de Troia
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

  // Servidor e decoração
  servidorImg = loadImage(
    "Assets/Servidor/Servidor_frame1.png"
  );

  plantinha = loadImage("Assets/plantinha.png.png");

  // Spritesheets do Bug
  bugSprites = {
    direita: loadImage(
      "Assets/Aranha Robótica/Sprite de Aranha Robótica - Direita.png"
    ),

    esquerda: loadImage(
      "Assets/Aranha Robótica/Sprite de Aranha Robótica - Esquerda.png"
    ),

    baixo: loadImage(
      "Assets/Aranha Robótica/Sprite de Aranha Robótica - Baixo.png"
    ),

    cima: loadImage(
      "Assets/Aranha Robótica/Sprite de Aranha Robótica - Cima.png"
    )
  };

  // Animações do Bug usando a classe Animacao.js
  animacoesBug = {
    direita: new Animacao(
      mapeamentoBug.direita,
      bugSprites.direita
    ),

    esquerda: new Animacao(
      mapeamentoBug.esquerda,
      bugSprites.esquerda
    ),

    baixo: new Animacao(
      mapeamentoBug.baixo,
      bugSprites.baixo
    ),

    cima: new Animacao(
      mapeamentoBug.cima,
      bugSprites.cima
    )
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight);

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
}

function posicionarServidor() {
  let xServidor = width * 0.50 - 60;
  let yServidor = height * 0.43 - 55;

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

// CRIAR CAVALO DE TROIA
function criarCavalo() {
  let locaisSpawn = [
    { x: 0, y: height * 0.27 },
    { x: 0, y: height * 0.30 },
    { x: 0, y: height * 0.33 },

    { x: width, y: height * 0.27 },
    { x: width, y: height * 0.30 },
    { x: width, y: height * 0.33 },

    { x: width * 0.47, y: 0 },
    { x: width * 0.50, y: 0 },
    { x: width * 0.53, y: 0 },

    { x: width * 0.47, y: height },
    { x: width * 0.50, y: height },
    { x: width * 0.53, y: height }
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

// CRIAR BUG
function criarBug() {
  console.log("Função criarBug foi chamada!");
  let locaisSpawn = [
    { x: 0, y: height * 0.27 },
    { x: 0, y: height * 0.30 },
    { x: 0, y: height * 0.33 },

    { x: width, y: height * 0.27 },
    { x: width, y: height * 0.30 },
    { x: width, y: height * 0.33 },

    { x: width * 0.47, y: 0 },
    { x: width * 0.50, y: 0 },
    { x: width * 0.53, y: 0 },

    { x: width * 0.47, y: height },
    { x: width * 0.50, y: height },
    { x: width * 0.53, y: height }
  ];

  let local = random(locaisSpawn);

  bugs.push(
    
    new Inimigo(
      local.x,
      local.y,
      null,
      animacoesBug
    )
    
  )
  console.log("Quantidade de Bugs:", bugs.length);
}

function draw() {
  if (estadoJogo === "menu") {
    menu.mostrar();
    return;
  }

  if (estadoJogo === "jogando") {
    jogar();

    // Fim da rodada 1: todos os cavalos foram derrotados.
    if (
      roundAtual === 1 &&
      total_cavalos_criados >= maxCavalos &&
      cavalos.length === 0 &&
      estadoRound === "jogando"
    ) {
      estadoRound = "transicao";
      tempoTransicaoRound = millis();
    }

    // Espera 5 segundos antes do anúncio da rodada 2.
    if (
      estadoRound === "transicao" &&
      millis() - tempoTransicaoRound >= 5000
    ) {
      roundAtual = 2;
      estadoRound = "anunciando";
      tempoTransicaoRound = millis();
    }

    // Mostra ROUND 2 por 5 segundos.
    if (
      estadoRound === "anunciando" &&
      millis() - tempoTransicaoRound >= 5000
    ) {
      estadoRound = "round2";
      tempoUltimoSpawnBug = millis();
    }

    // Surgimento gradual dos cavalos na rodada 1.
    if (
      roundAtual === 1 &&
      estadoRound === "jogando" &&
      millis() - tempoInicioJogo >= 10000 &&
      millis() - tempoUltimoSpawn >= 5000 &&
      total_cavalos_criados < maxCavalos
    ) {
      criarCavalo();

      total_cavalos_criados++;
      tempoUltimoSpawn = millis();
    }

    // Surgimento gradual dos Bugs na rodada 2.
    if (
      roundAtual === 2 &&
      estadoRound === "round2" &&
      total_bugs_criados < maxBugs &&
      millis() - tempoUltimoSpawnBug >= 5000
    ) {
      criarBug();

      total_bugs_criados++;
      tempoUltimoSpawnBug = millis();
    }

    // Atualiza e desenha os cavalos.
    for (let cavalo of cavalos) {
      let distanciaJogador = dist(
        cavalo.x + cavalo.largura / 2,
        cavalo.y + cavalo.altura / 2,
        jogador.x + jogador.largura / 2,
        jogador.y + jogador.altura / 2
      );

      if (distanciaJogador <= 200) {
        cavalo.mover(jogador);
        cavalo.atacar(jogador);
      } else {
        cavalo.mover(servidor);
        cavalo.atacar(servidor);
      }

      cavalo.animar();
      cavalo.mostrar();
      cavalo.mostrarVida();
    }

    // Atualiza e desenha os Bugs.
    for (let bug of bugs) {
      let distanciaJogador = dist(
        bug.x + bug.largura / 2,
        bug.y + bug.altura / 2,
        jogador.x + jogador.largura / 2,
        jogador.y + jogador.altura / 2
      );

      if (distanciaJogador <= 200) {
        bug.mover(jogador);
        bug.atacar(jogador);
      } else {
        bug.mover(servidor);
        bug.atacar(servidor);
      }

      bug.animar();
      bug.mostrar();
      bug.mostrarVida();
    }

    // Game Over.
    if (
      servidor.foiDestruido() ||
      jogador.vida <= 0
    ) {
      estadoJogo = "gameover";
    }
  }

  // Anúncio da rodada 2.
  if (
    estadoJogo === "jogando" &&
    estadoRound === "anunciando"
  ) {
    push();

    fill(0, 0, 0, 180);
    rectMode(CORNER);
    noStroke();
    rect(0, 0, width, height);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(64);
    textFont(fonte);
    text("ROUND 2", width / 2, height / 2 - 50);

    pop();
  }

  // Game Over.
  if (estadoJogo === "gameover") {
    background(0);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(80);
    textFont(fonte);
    text("GAME OVER", width / 2, height / 2);
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

  let xAnterior = jogador.x;
  let yAnterior = jogador.y;

  jogador.mover();

  let hitboxServidor = servidor.serverHitbox();

  if (jogador.checarColisao(hitboxServidor)) {
    jogador.x = xAnterior;
    jogador.y = yAnterior;
  }

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

  servidor.mostrar();
  servidor.mostrarVida();

  jogador.animar();
  jogador.mostrar();
  jogador.mostrarVida();

  atualizarTiros();

  // Plantinhas decorativas.
  image(
    plantinha,
    width * 0.065,
    height * 0.20,
    60,
    60
  );

  image(
    plantinha,
    width * 0.05,
    height * 0.67,
    60,
    60
  );
}

function keyPressed() {
  if (estadoJogo === "jogando") {
    if (key === " ") {
      atirar();
    }
  }
}

function atualizarTiros() {
  for (let i = tiros.length - 1; i >= 0; i--) {
    let tiro = tiros[i];

    tiro.mover();

    let acertou = false;

    // Os tiros podem acertar cavalos ou Bugs.
    let listasInimigos = [cavalos, bugs];

    for (let lista of listasInimigos) {
      for (let j = lista.length - 1; j >= 0; j--) {
        let inimigo = lista[j];
        let hitbox = inimigo.inimigoHitbox();

        if (tiro.checarColisao(hitbox)) {
          inimigo.receberDano(tiro.dano);
          acertou = true;

          if (inimigo.estaMorto()) {
            lista.splice(j, 1);
          }

          break;
        }
      }

      if (acertou) {
        break;
      }
    }

    if (acertou || tiro.saiuDaTela()) {
      tiros.splice(i, 1);
    } else {
      tiro.mostrar();
    }
  }

  // Luz lilás perto do servidor.
  push();
  noStroke();

  fill(180, 100, 255, 15);
  ellipse(width * 0.50, height * 0.43, 260, 200);

  fill(180, 100, 255, 25);
  ellipse(width * 0.50, height * 0.43, 180, 140);

  fill(180, 100, 255, 35);
  ellipse(width * 0.50, height * 0.43, 100, 80);

  pop();
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

  posicionarServidor();
}
