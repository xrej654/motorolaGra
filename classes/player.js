// Tworzenie klasy Player
class Player {
    constructor({ position }) {
        this.position = position;
        this.width = 20;
        this.height = 50;
        this.angle = 0;
        this.speed = 0;
        this.maxSpeed = 3;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.key = {
            a: false,
            d: false
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
                this.speed -= 0.01;
                if (this.speed < 0) this.speed = 0;
            }
            else if (this.speed < 0) {
                this.speed += 0.01;
                if (this.speed > 0) this.speed = 0;
            }
        }
        if (this.key.w && this.speed <= this.maxSpeed) {
            this.speed += 0.02;

        }
        else if (this.key.s && this.speed >= -this.maxSpeed) {
            this.speed -= 0.02;
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
        let turnSpeed;
        if(this.speed > 0) turnSpeed = 2 - (this.speed / this.maxSpeed) * 1.2;
        else if(this.speed < 0) turnSpeed = -2 - (this.speed / this.maxSpeed) * 1.2;
        if (this.speed == 0) return;
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
}