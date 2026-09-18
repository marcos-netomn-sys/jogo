class Menu {

  constructor(backmenu, spritesBotao, fonte) {

    this.backmenu = backmenu;
    this.spritesBotao = spritesBotao;
    this.fonte = fonte;

    this.texto = "SERVER DEFENCE";
    this.textoAtual = "";

    this.indice = 0;
    this.tempo = 0;
    this.velocidadeTexto = 5;

    this.frameBotao = 0;
    this.tempoBotao = 0;
    this.velocidadeBotao = 5;

    this.larguraBotao = 300;
    this.alturaBotao = 100;
  }


  animarTexto() {

    this.tempo++;

    if (
      this.tempo >= this.velocidadeTexto &&
      this.indice < this.texto.length
    ) {

      this.textoAtual += this.texto[this.indice];

      this.indice++;

      this.tempo = 0;
    }
  }


  mouseSobreBotao() {

    let x = width / 2 - this.larguraBotao / 2;
    let y = height / 2;

    return (
      mouseX >= x &&
      mouseX <= x + this.larguraBotao &&
      mouseY >= y &&
      mouseY <= y + this.alturaBotao
    );
  }


  animarBotao() {

    if (this.mouseSobreBotao()) {

      this.tempoBotao++;

      if (this.tempoBotao >= this.velocidadeBotao) {

        if (
          this.frameBotao <
          this.spritesBotao.length - 1
        ) {

          this.frameBotao++;
        }

        this.tempoBotao = 0;
      }

    } else {

      this.frameBotao = 0;
      this.tempoBotao = 0;
    }
  }


  mostrarBotao() {

    this.animarBotao();

    let x = width / 2 - this.larguraBotao / 2;
    let y = height / 2;

    // Sprite do botão
    image(
      this.spritesBotao[this.frameBotao],
      x,
      y,
      this.larguraBotao,
      this.alturaBotao
    );

    // Texto JOGAR
    textFont(this.fonte);
    textAlign(CENTER, CENTER);
    textSize(30);

    fill(255);
    noStroke();

    text(
      "JOGAR",
      x + this.larguraBotao / 2,
      y + this.alturaBotao / 2
    );
  }


  mostrar() {

    // Fundo
    image(
      this.backmenu,
      0,
      0,
      width,
      height
    );

    // Título animado
    this.animarTexto();

    textFont(this.fonte);
    textAlign(CENTER, CENTER);
    textSize(50);

    fill("#0886da");
    noStroke();

    text(
      this.textoAtual,
      width / 2,
      height / 3
    );

    // Botão + texto JOGAR
    this.mostrarBotao();
  }


  clicouJogar() {

    return this.mouseSobreBotao();
  }
}