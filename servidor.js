class Servidor {

    constructor(x, y, imagem) {

        // POSIÇÃO
        this.x = x;
        this.y = y;

        // TAMANHO
        this.largura = 120;
        this.altura = 120;

        // IMAGEM DO SERVIDOR
        this.imagem = imagem;

        // VIDA
        this.vidaMaxima = 500;
        this.vida = this.vidaMaxima;
    }

    mostrar() {

        image(
            this.imagem,
            this.x,
            this.y,
            this.largura,
            this.altura
        );

    }

    receberDano(dano) {

        this.vida -= dano;

        if (this.vida < 0) {
            this.vida = 0;
        }

    }

    foiDestruido() {

        return this.vida <= 0;

    }

    mostrarVida() {

        let x = 709;
        let y = 230;

        let larguraBarra = 120;
        let alturaBarra = 10;

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

        fill("#4acd1a");
        rect(
            x,
            y,
            larguraVida,
            alturaBarra
        );

        fill(255);
        textSize(16);

    }

    serverHitbox() {

    return {
        x: this.x,
        y: this.y,
        largura: this.largura,
        altura: this.altura
    };

}
}