const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
    constructor({ position }) {
        this.position = position;
        this.width = 50;
        this.height = 100;
        this.angle = 0;
        this.speed = 0;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.key = {
            a: false,
            d: false
        }
    }

    update() {
        this.draw();
        this.accelerate();
        this.turn();
        this.physics();
    }

    physics()
    {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    accelerate() {
        console.log(this.speed)
        if (this.key.w && this.key.s) 
        {
            this.velocity.x = 0;
            this.velocity.y = 0;
            return;
        }
            
        if (!this.key.w && !this.key.s && this.speed > 0)
        {
            this.speed -= 0.01;
        }
        if (this.key.w)
        {
            this.speed += 0.01;
            this.velocity.y = -(this.speed * Math.cos(convertToRadians(this.angle)));
            this.velocity.x = this.speed * Math.sin(convertToRadians(this.angle));
        }
        else if (this.key.s)
        {
            this.velocity.y = this.speed * Math.cos(convertToRadians(this.angle));
            this.velocity.x = -(this.speed * Math.sin(convertToRadians(this.angle)));
        }
    }

    draw() {
        c.save();
        c.translate(player.position.x + player.width / 2, player.position.y + player.height / 2);
        c.rotate(convertToRadians(this.angle));

        c.fillStyle = "red";
        c.fillRect(-player.width / 2, -player.height / 2, player.width, player.height);

        c.fillStyle = "white";
        c.font = "100px Arial";
        c.fillText("↑", -25, 25);

        c.restore();
    }


    turn() {
        //if (!this.key.w || !this.key.s) return;
        if (this.key.a) {
            if (this.angle == 0) this.angle = 360;
            this.angle -= 2;
        }
        if (this.key.d) {
            if (this.angle == 360) this.angle = 0;
            this.angle += 2;
        }
    }
}

function convertToRadians(angle) {
    return (angle * Math.PI / 180);
}

const player = new Player({
    position: {
        x: 300,
        y: 200
    }
})

function animate() {
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();

    requestAnimationFrame(animate);
}

animate();

addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

addEventListener("keydown", (e) => {
    switch (e.key.toLowerCase()) {
        case "a":
            player.key.a = true;
            break;
        case "d":
            player.key.d = true;
            break;
        case "w":
            player.key.w = true;
            break;
        case "s":
            player.key.s = true;
            break;
    }
})

addEventListener("keyup", (e) => {
    switch (e.key.toLowerCase()) {
        case "a":
            player.key.a = false;
            break;
        case "d":
            player.key.d = false;
            break;
        case "w":
            player.key.w = false;
            break;
        case "s":
            player.key.s = false;
            break;
    }
})