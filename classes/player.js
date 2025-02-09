// Tworzenie klasy Player
class Player {
    constructor({ position }) {
        this.position = position;
        this.width = 20;
        this.height = 50;
        //zmienna okreslajaca stopien obrotu pojazdu
        this.angle = 0;
        this.speed = 0;
        this.speedValue = 0.015;
        this.friction = 0.008;
        this.maxSpeed = 3;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.key = {
            a: false,
            d: false,
            w: false,
            s: false
        }
    }

    // Metoda która aktualizuje parametry i grafikę instancji klasy
    update() {
        this.draw();
        this.accelerate();
        this.turn();
        this.physics();
    }

    // Metoda która dodaje prędkość pojazdu
    physics() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    // Metoda odpowiedzialna za zmianę prędkości pojazdu
    accelerate() {
        if (!this.key.w && !this.key.s) {
            if (this.speed > 0) {
                this.speed -= this.friction;
                if (this.speed < 0) this.speed = 0;
            }
            else if (this.speed < 0) {
                this.speed += this.friction;
                if (this.speed > 0) this.speed = 0;
            }
        }
        if (this.key.w && this.speed <= this.maxSpeed) {
            if (this.speed < 0) this.speed += this.speedValue;
            else this.speed += this.speedValue + this.friction;

        }
        else if (this.key.s && this.speed >= -this.maxSpeed) {
            if (this.speed > 0) this.speed -= this.speedValue;
            else this.speed -= (this.speedValue + this.friction);
        }
        this.velocity.y = -(this.speed * Math.cos(convertToRadians(this.angle)));
        this.velocity.x = this.speed * Math.sin(convertToRadians(this.angle));
    }

    // Metoda która wyświetla pojazd
    draw() {
        c.save();
        c.translate(player.position.x + player.width / 2, player.position.y + player.height / 2);
        c.rotate(convertToRadians(this.angle));

        c.fillStyle = "red";
        c.fillRect(-player.width / 2, -player.height / 2, player.width, player.height);

        c.fillStyle = "white";
        c.font = "50px Arial";
        c.fillText("↑", -12.5, 12.5);

        c.restore();
    }

    // Metoda która obraca pojazd
    turn() {
        let turnSpeed = this.changeTurningSpeed();
        if (this.key.a) {
            if (this.speed > 0) {
                this.angle -= turnSpeed;
                if (this.angle == 0) this.angle = 360;
            }
            if (this.speed < 0) {
                this.angle += turnSpeed;
                if (this.angle == 360) this.angle = 0;
            }
        }
        if (this.key.d) {
            if (this.speed > 0) {
                this.angle += turnSpeed;
                if (this.angle == 360) this.angle = 0;
            }
            if (this.speed < 0) {
                this.angle -= turnSpeed;
                if (this.angle == 0) this.angle = 360;
            }
        }
    }

    // Metoda która zmienia szybkość obrotu w zależności od szybkości auta
    changeTurningSpeed() {
        if (this.speed > 0) {
            if (this.speed <= 2) return this.speed / 1.5;
            else return 2 - (this.speed / this.maxSpeed) * 1.2;
        }
        else if (this.speed < 0) {
            if (this.speed >= -2) return -this.speed / 1.5;
            else return 2 + (this.speed / this.maxSpeed) * 1.2;
        }
    }
}