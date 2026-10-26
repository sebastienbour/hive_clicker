"use strict";
class Bee {
    constructor(game, speed, respawn, power) {
        this.game_ = game;
        this.element_ = document.createElement("img");
        this.element_.src = "bee.png";
        this.element_.classList.add("bee");
        this.element_.draggable = false;
        this.game_.getElement().appendChild(this.element_);
        this.speed_ = speed;
        this.respawn_ = respawn;
        this.power_ = power;
        this.spawn();
    }
    setRespawn(time) {
        this.respawn_ = time;
    }
    setSpeed(speed) {
        this.speed_ = speed;
    }
    setStrength(strength) {
        this.power_ = strength;
    }
    spawn() {
        const side = Math.floor(Math.random() * 4);
        const width = window.innerWidth;
        const height = window.innerHeight;
        let x = 0;
        let y = 0;
        if (side === 0) {
            x = Math.random() * width;
            y = -40;
        }
        else if (side === 1) {
            x = width + 40;
            y = Math.random() * height;
        }
        else if (side === 2) {
            x = Math.random() * width;
            y = height + 40;
        }
        else {
            x = -40;
            y = Math.random() * height;
        }
        this.x_ = x;
        this.y_ = y;
        this.element_.style.left = `${x}px`;
        this.element_.style.top = `${y}px`;
        this.move();
    }
    move() {
        const targetX = window.innerWidth / 2 - 16;
        const targetY = window.innerHeight / 2 + 25;
        const dx = targetX - this.x_;
        const dy = targetY - this.y_;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.speed_) {
            this.arrive();
            return;
        }
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        this.element_.style.transform = `rotate(${angle}deg)`;
        this.x_ += (dx / dist) * this.speed_;
        this.y_ += (dy / dist) * this.speed_;
        this.element_.style.left = `${this.x_}px`;
        this.element_.style.top = `${this.y_}px`;
        setTimeout(() => this.move(), 16);
    }
    arrive() {
        this.game_.addHoney(this.x_, this.y_, this.power_, "white");
        this.element_.remove();
        setTimeout(() => {
            this.element_ = document.createElement("img");
            this.element_.src = "bee.png";
            this.element_.classList.add("bee");
            this.element_.draggable = false;
            this.game_.getElement().appendChild(this.element_);
            this.spawn();
        }, this.respawn_);
    }
}
