class Menu {

  constructor(backmenu, spritesBotao, logoFrames, fonte) {

    this.backmenu = backmenu;
    this.spritesBotao = spritesBotao;
    this.logoFrames = logoFrames;
    this.fonte = fonte;

    this.frameLogo = 0;
    this.tempoLogo = 0;
    this.velocidadeLogo = 10;

    this.frameBotao = 0;
    this.tempoBotao = 0;
    this.velocidadeBotao = 5;

    this.larguraLogo = 500;
    this.alturaLogo = 250;

    this.larguraBotao = 300;
    this.alturaBotao = 100;
  }


  animarLogo() {

    if (this.logoFrames.length === 0) {
      return;
    }

    this.tempoLogo++;

    if (this.tempoLogo >= this.velocidadeLogo) {

      this.frameLogo++;

      if (this.frameLogo >= this.logoFrames.length) {
        this.frameLogo = 0;
      }

      this.tempoLogo = 0;
    }
  }


  mostrarLogo() {

    if (this.logoFrames.length === 0) {
      return;
    }

    this.animarLogo();

    let x = width / 2;
    let y = height * 0.30;

    imageMode(CENTER);

    image(
      this.logoFrames[this.frameLogo],
      x,
      y,
      this.larguraLogo,
      this.alturaLogo
    );

    imageMode(CORNER);
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

    if (this.spritesBotao.length === 0) {
      return;
    }

    this.animarBotao();

    let x = width / 2 - this.larguraBotao / 2;
    let y = height / 2;

    imageMode(CORNER);

    image(
      this.spritesBotao[this.frameBotao],
      x,
      y,
      this.larguraBotao,
      this.alturaBotao
    );
  }


  mostrar() {

    imageMode(CORNER);

    image(
      this.backmenu,
      0,
      0,
      width,
      height
    );

    this.mostrarLogo();

    this.mostrarBotao();
  }


  clicouJogar() {

    return this.mouseSobreBotao();
  }
}