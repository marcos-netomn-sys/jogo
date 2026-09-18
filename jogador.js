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
    
    this.vidaMaxima = 100;
    this.vida = this.vidaMaxima;
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


  checarColisao(outro) {



    return (
      jogador.x + 10 < outro.x + outro.largura &&
      jogador.x - 20 + jogador.largura > outro.x &&
      jogador.y + 10 < outro.y + outro.altura &&
      jogador.y - 10 + jogador.altura > outro.y
    );

  }
  receberDano(dano) {

  this.vida -= dano;

  if (this.vida < 0) {
    this.vida = 0;
  }

}
mostrarVida() {

  let x = 30;
  let y = 30;

  let larguraBarra = 200;
  let alturaBarra = 20;

  let larguraVida = map(
    this.vida,
    0,
    this.vidaMaxima,
    0,
    larguraBarra
  );

  fill(50);
  rect(
    x,
    y,
    larguraBarra,
    alturaBarra
  );

  fill(0, 255, 0);
  rect(
    x,
    y,
    larguraVida,
    alturaBarra
  );

  fill(255);
  textSize(16);
  

  text(
    this.vida + " / " + this.vidaMaxima,
    x,
    y + 40
  );
}

}