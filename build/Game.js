"use strict";
class Game {
    constructor(game) {
        this.element_ = game;
        this.score_ = document.querySelector("#score span");
        this.count_ = 0;
        this.total_ = 0;
        this.multiplier_ = 1;
        this.bonus_ = document.getElementById("bonus");
        this.bees_ = [];
        this.beeRespawn_ = 10000;
        this.crit_ = 2;
        this.critChance_ = 0;
        this.beeSpeed_ = 1;
        this.beeStrength_ = 5;
        this.endScreen_ = document.getElementById("end-screen");
    }
    start() {
        this.hive_ = new Hive(this);
        this.upgrades_ = new Upgrades(this);
        this.getGold(1);
    }
    getElement() {
        return this.element_;
    }
    getCrit() {
        return this.crit_;
    }
    getCritChance() {
        return this.critChance_;
    }
    addHoney(x, y, amount, color) {
        new Honey(x, y, amount, color);
        this.updateScore(amount);
    }
    updateScore(amount) {
        this.count_ += amount;
        if (amount > 0) {
            this.total_ += amount;
        }
        this.score_.textContent = this.count_.toString();
        this.updateMultiplier();
    }
    updateMultiplier() {
        const paliers = [0, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000];
        for (let i = 0; i < paliers.length; i++) {
            if (this.total_ >= paliers[i])
                this.multiplier_ = i + 1;
        }
        this.bonus_.textContent = `×${this.multiplier_}`;
        this.hive_.setPower(this.multiplier_);
    }
    canAfford(cost) {
        return this.count_ >= cost;
    }
    spendHoney(cost) {
        this.updateScore(-cost);
    }
    spawnBee() {
        const bee = new Bee(this, this.beeSpeed_, this.beeRespawn_, this.beeStrength_);
        this.bees_.push(bee);
    }
    setBeeRespawn(time) {
        this.beeRespawn_ = time;
        this.bees_.forEach(bee => bee.setRespawn(time));
    }
    setCrit(crit, chance) {
        this.crit_ = crit;
        this.critChance_ = chance;
    }
    setBeeSpeed(speed) {
        this.beeSpeed_ = speed;
        this.bees_.forEach(bee => bee.setSpeed(speed));
    }
    setBeeStrength() {
        this.beeStrength_ *= 2;
        this.bees_.forEach(bee => bee.setStrength(this.beeStrength_));
    }
    activateSensor() {
        setInterval(() => {
            this.hive_.sensorEffect();
        }, 2000);
    }
    displayEndScreen() {
        this.endScreen_.style.display = "flex";
    }
    getGold(id) {
        let request = new XMLHttpRequest();
        let parameters = "id=" + id;
        request.open("get", "http://192.168.56.107/~sae/gold/api.php?" + parameters);
        request.onreadystatechange = () => {
            if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
                this.gold_ = JSON.parse(request.responseText);
                this.getCode();
            }
        };
        request.send();
    }
    getCode() {
        this.code_ = this.gold_.code;
        document.getElementById("code").textContent = this.code_;
    }
}
