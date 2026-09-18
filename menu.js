

class Menu {

  constructor() {

    this.texto = "SERVER DEFENCE";

    this.textoAtual = "";

    this.indice = 0;

    this.tempo = 0;

    this.velocidadeTexto = 5;

    this.larguraBotao = 200;

    this.alturaBotao = 60;
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


 mostrar() {

  image(
    backmenu,
    0,
    0,
    width,
    height
  );

  this.animarTexto();
  textFont(fonte);
  textAlign(CENTER, CENTER);

  fill("#888b8d");
  textSize(40);

  text(
    this.textoAtual,
    width / 2,
    height / 3
  );

  fill(0, 150, 255);

  rect(
    width / 2 - this.larguraBotao / 2,
    height / 2,
    this.larguraBotao,
    this.alturaBotao
  );

  fill(255);
  textSize(25);

  text(
    "JOGAR",
    width / 2,
    height / 2 + this.alturaBotao / 2
  );
}

  clicouJogar() {

    return (
      mouseX > width / 2 - this.larguraBotao / 2 &&
      mouseX < width / 2 + this.larguraBotao / 2 &&
      mouseY > height / 2 &&
      mouseY < height / 2 + this.alturaBotao
    );
  }
}