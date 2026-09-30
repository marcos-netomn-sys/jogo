class Inimigo {
  constructor(x, y, sprites) {
    this.x = x;
    this.y = y;

    this.largura = 100;
    this.altura = 100;

    this.velocidade = 1;

    this.direcao = "direita";
    this.andando = true;

    this.sprites = sprites;

    this.frameAtual = 0;
    this.tempoFrame = 0;
    this.velocidadeAnimacao = 10;

    this.vidaMaxima = 100;
    this.vida = this.vidaMaxima;

    this.dano = Math.floor(Math.random() * 31);
    this.atacando = false
    this.tempoAtaque = 0;
  }
  atacar(alvo) {

    if (this.atacando) {

        this.tempoAtaque++;

        if (this.tempoAtaque >= 60) {

            alvo.receberDano(this.dano);

            this.tempoAtaque = 0;
        }
    }
}

  mover(alvo) {

    let dx = alvo.x - this.x;
    let dy = alvo.y - this.y;

    let distancia = sqrt(dx * dx + dy * dy);

    if (distancia > 0) {

      dx /= distancia;
      dy /= distancia;

      // Guarda a posição antes de andar
      let xAnterior = this.x;
      let yAnterior = this.y;

      // Anda em direção ao alvo
      this.x += dx * this.velocidade;
      this.y += dy * this.velocidade;


      // HITBOX DO SERVIDOR
      let hitboxAlvo = alvo.serverHitbox();

      let colidiu =
        this.x < hitboxAlvo.x + hitboxAlvo.largura &&
        this.x + this.largura > hitboxAlvo.x &&
        this.y < hitboxAlvo.y + hitboxAlvo.altura &&
        this.y + this.altura > hitboxAlvo.y;


      // Se entrou no servidor, volta para a posição anterior
      if (colidiu) {

        this.x = xAnterior;
        this.y = yAnterior;

        this.andando = false;
        this.atacando = true;

        return;
      }

      this.andando = true;
      this.atacando = false;

      // DESCOBRE A DIREÇÃO
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

    // Se o cavalo estiver parado
    if (!this.andando) {

      this.frameAtual = 0;
      this.tempoFrame = 0;

      return;
    }

    // Se estiver andando
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

     inimigoHitbox() {
    return {
      x: this.x,
      y: this.y,
      largura: this.largura,
      altura: this.altura
    };
  }
    mostrarVida() {
    let larguraBarra = this.largura;
    let alturaBarra = 8;

    let vidaAtual =
      (this.vida / this.vidaMaxima) * larguraBarra;

    push();
    noStroke();

    // Fundo da barra
    fill(255, 0, 0);
    rect(
      this.x,
      this.y - 15,
      larguraBarra,
      alturaBarra
    );

    // Vida restante
    fill(0, 200, 0);
    rect(
      this.x,
      this.y - 15,
      vidaAtual,
      alturaBarra
    );

    pop();
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
