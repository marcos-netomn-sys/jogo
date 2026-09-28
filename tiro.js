class Tiro {
  constructor(x, y, direcao) {
    this.x = x;
    this.y = y;
    this.direcao = direcao;
    this.velocidade = 10;
    this.largura = 20;
    this.altura = 20;
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
}