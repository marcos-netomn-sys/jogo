class Tiro {
  constructor(x, y, direcao) {
    this.x = x;
    this.y = y;
    this.direcao = direcao;
    this.velocidade = 10;
    this.largura = 20;
    this.altura = 20;
    this.dano = 10;
  }

  mover() {
    if (this.direcao === "cima") this.y -= this.velocidade;
    if (this.direcao === "baixo") this.y += this.velocidade;
    if (this.direcao === "esquerda") this.x -= this.velocidade;
    if (this.direcao === "direita") this.x += this.velocidade;
  }

  mostrar() {
    noStroke();
    fill(0, 200, 255);
    ellipse(this.x, this.y, this.largura, this.altura);
  }

  saiuDaTela() {
    return (
      this.x < 0 ||
      this.x > width ||
      this.y < 0 ||
      this.y > height
    );
  }

  checarColisao(hitbox) {
    return (
      this.x - this.largura / 2 < hitbox.x + hitbox.largura &&
      this.x + this.largura / 2 > hitbox.x &&
      this.y - this.altura / 2 < hitbox.y + hitbox.altura &&
      this.y + this.altura / 2 > hitbox.y
    );
  }


}

