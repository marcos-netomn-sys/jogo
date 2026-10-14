
class Inimigo {
  constructor(x, y, sprites, animacoes = null) {
    this.x = x;
    this.y = y;

    this.largura = 100;
    this.altura = 100;

    this.velocidade = 1.5;

    this.direcao = "direita";
    this.andando = true;

    // Sprites antigos, usados pelos cavalos
    this.sprites = sprites;

    // Animações novas, usadas pelo Bug
    this.animacoes = animacoes;

    this.frameAtual = 0;
    this.tempoFrame = 0;
    this.velocidadeAnimacao = 10;

    this.vidaMaxima = 100;
    this.vida = this.vidaMaxima;

    this.dano = Math.floor(Math.random() * 21);
    this.atacando = false;
    this.tempoAtaque = 0;
  }

  atacar(alvo) {
    if (this.atacando) {
      this.tempoAtaque++;

      if (this.tempoAtaque >= 60) {
        alvo.receberDano(this.dano);
        this.tempoAtaque = 0;
      }
    } else {
      this.tempoAtaque = 0;
    }
  }

  mover(alvo) {
    let dx =
      (alvo.x + (alvo.largura || 0) / 2) -
      (this.x + this.largura / 2);

    let dy =
      (alvo.y + (alvo.altura || 0) / 2) -
      (this.y + this.altura / 2);

    let distancia = sqrt(dx * dx + dy * dy);

    // Perto do alvo: para e ataca
    if (distancia <= 70) {
      this.andando = false;
      this.atacando = true;
      return;
    }

    if (distancia <= 0) {
      this.andando = false;
      this.atacando = false;
      return;
    }

    dx /= distancia;
    dy /= distancia;

    let xAnterior = this.x;
    let yAnterior = this.y;

    this.x += dx * this.velocidade;
    this.y += dy * this.velocidade;

    // Colisão especial com o servidor
    if (typeof alvo.serverHitbox === "function") {
      let hitboxAlvo = alvo.serverHitbox();

      let colidiu =
        this.x < hitboxAlvo.x + hitboxAlvo.largura &&
        this.x + this.largura > hitboxAlvo.x &&
        this.y < hitboxAlvo.y + hitboxAlvo.altura &&
        this.y + this.altura > hitboxAlvo.y;

      if (colidiu) {
        this.x = xAnterior;
        this.y = yAnterior;
        this.andando = false;
        this.atacando = true;
        return;
      }
    }

    this.andando = true;
    this.atacando = false;

    // Define a direção do movimento
    if (abs(dx) > abs(dy)) {
      this.direcao = dx > 0 ? "direita" : "esquerda";
    } else {
      this.direcao = dy > 0 ? "baixo" : "cima";
    }
  }

  animar() {
    // Bug: usa a classe Animacao do professor
    if (this.animacoes) {
      let animacaoAtual = this.animacoes[this.direcao];

      if (this.andando && animacaoAtual) {
        animacaoAtual.avancarFrame();
      }

      return;
    }

    // Cavalos: mantém o sistema de animação antigo
    if (
      !this.sprites ||
      !this.sprites[this.direcao] ||
      this.sprites[this.direcao].length === 0
    ) {
      return;
    }

    if (!this.andando) {
      this.frameAtual = 0;
      this.tempoFrame = 0;
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
    // Desenha o Bug com a classe Animacao
    if (this.animacoes) {
      let animacaoAtual = this.animacoes[this.direcao];

      if (animacaoAtual) {
        animacaoAtual.desenhar(
          this.x,
          this.y,
          this.largura,
          this.altura
        );
      }

      return;
    }

    // Desenha os cavalos usando o sistema antigo
    if (!this.sprites || !this.sprites[this.direcao]) {
      return;
    }

    let sprite = this.sprites[this.direcao][this.frameAtual];

    if (sprite) {
      image(sprite, this.x, this.y, this.largura, this.altura);
    }
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

    fill(255, 0, 0);
    rect(
      this.x,
      this.y - 15,
      larguraBarra,
      alturaBarra
    );

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
