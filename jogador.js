class Jogador {
  constructor(x, y, sprites) {
    this.x = x;
    this.y = y;

    this.largura = 80;
    this.altura = 80;

    this.velocidade = 4;

    this.sprites = sprites;

    this.direcao = "baixo";
    this.andando = false;

    this.frameAtual = 0;
    this.tempoFrame = 0;
    this.velocidadeAnimacao = 8;
  }

  mover() {
    this.andando = false;

    if (keyIsDown(87)) { // W
      this.y -= this.velocidade;
      this.direcao = "cima";
      this.andando = true;
    }

    if (keyIsDown(83)) { // S
      this.y += this.velocidade;
      this.direcao = "baixo";
      this.andando = true;
    }

    if (keyIsDown(65)) { // A
      this.x -= this.velocidade;
      this.direcao = "esquerda";
      this.andando = true;
    }

    if (keyIsDown(68)) { // D
      this.x += this.velocidade;
      this.direcao = "direita";
      this.andando = true;
    }
  }

  animar() {
    if (this.andando) {
      this.tempoFrame++;

      if (this.tempoFrame >= this.velocidadeAnimacao) {
        this.frameAtual++;

        if (this.frameAtual >= this.sprites[this.direcao].length) {
          this.frameAtual = 0;
        }

        this.tempoFrame = 0;
      }
    } else {
      this.frameAtual = 0;
      this.tempoFrame = 0;
    }
  }

  mostrar() {
    let sprite;

    if (this.andando) {
      sprite = this.sprites[this.direcao][this.frameAtual];
    } else {
      sprite = this.sprites[this.direcao][0];
    }

    image(
      sprite,
      this.x,
      this.y,
      this.largura,
      this.altura
    );
  }
}