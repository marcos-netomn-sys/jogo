class Inimigo {
  constructor(x, y, sprites) {
    this.x = x;
    this.y = y;

    this.largura = 100;
    this.altura = 100;

    this.velocidade = 1.5;

    this.direcao = "direita";
    this.andando = true;

    this.sprites = sprites;

    this.frameAtual = 0;
    this.tempoFrame = 0;
    this.velocidadeAnimacao = 10;

    this.vidaMaxima = 100;
    this.vida = this.vidaMaxima;

    this.dano = 10;
  }

  mover(alvo) {
    let dx = alvo.x - this.x;

    let dy = alvo.y - this.y;

    let distancia = sqrt(dx * dx + dy * dy);

    if (distancia > 0) {
      dx /= distancia;
      dy /= distancia;

      this.x += dx * this.velocidade;
      this.y += dy * this.velocidade;

      if (abs(dx) > abs(dy)) {
        if (dx > 0) {
          this.direcao = "direita";
        } else {
          this.direcao = "esquerda";
        }
      } else {
        if (dy > 0) {
          this.direcao = "baixo";
        } else {
          this.direcao = "cima";
        }
      }
    }
  }

  animar() {
    if (
      !this.sprites[this.direcao] ||
      this.sprites[this.direcao].length === 0
    ) {
      return;
    }

    this.tempoFrame++;

    if (this.tempoFrame >= this.velocidadeAnimacao) {
      this.frameAtual++;

      if (this.frameAtual >= this.sprites[this.direcao].length) {
        this.frameAtual = 0;
      }

      this.tempoFrame = 0;
    }
  }

  mostrar() {
    if (!this.sprites[this.direcao]) {
      return;
    }

    let sprite = this.sprites[this.direcao][this.frameAtual];

    if (!sprite) {
      return;
    }

    image(sprite, this.x, this.y, this.largura, this.altura);
  }

  receberDano(dano) {
    this.vida -= dano;

    if (this.vida < 0) {
      this.vida = 0;
    }
  }

  estaMorto() {
    return this.vida <= 0;
  }
}
