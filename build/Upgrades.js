"use strict";
class Upgrades {
    constructor(game) {
        this.game_ = game;
        this.element_ = document.getElementById("upgrades");
        this.beeCount_ = 0;
        this.respawnCount = 0;
        this.critCount_ = 0;
        this.speedCount_ = 0;
        this.strengthCount_ = 0;
        this.gold_ = false;
        this.music_ = document.getElementById("music");
        this.initializeUpgrades();
    }
    initializeUpgrades() {
        this.addBeeUpgrade();
        this.addStrengthUpgrade();
        this.addSpeedUpgrade();
        this.addRespawnUpgrade();
        this.addCritUpgrade();
        this.addGoldUpgrade();
    }
    addBeeUpgrade() {
        let cost = 20;
        const upgrade = document.createElement("div");
        upgrade.classList.add("upgrade");
        const title = document.createElement("div");
        title.innerHTML = `Abeille - ${cost} <img src="honey.png" class="cost-icon">`;
        title.classList.add("upgrade-name");
        const description = document.createElement("div");
        description.classList.add("upgrade-desc");
        description.textContent = "Produit du miel";
        const icon = document.createElement("img");
        icon.src = "bee.png";
        icon.classList.add("upgrade-icon");
        upgrade.appendChild(icon);
        const content = document.createElement("div");
        content.classList.add("upgrade-content");
        content.appendChild(title);
        content.appendChild(description);
        upgrade.appendChild(content);
        upgrade.addEventListener("click", () => {
            if (!this.game_.canAfford(cost))
                return;
            this.game_.spendHoney(cost);
            this.beeCount_++;
            cost += 20;
            title.innerHTML = `Abeille (x${this.beeCount_}) - ${cost} <img src="honey.png" class="cost-icon">`;
            if (this.beeCount_ == 20) {
                title.innerHTML = `Abeille (x${this.beeCount_}) - MAX`;
                upgrade.style.pointerEvents = "none";
            }
            this.game_.spawnBee();
        });
        this.element_.appendChild(upgrade);
    }
    addStrengthUpgrade() {
        let cost = 100;
        const upgrade = document.createElement("div");
        upgrade.classList.add("upgrade");
        const title = document.createElement("div");
        title.innerHTML = `Force - ${cost} <img src="honey.png" class="cost-icon">`;
        title.classList.add("upgrade-name");
        const description = document.createElement("div");
        description.classList.add("upgrade-desc");
        description.textContent = "Double la récolte de miel actuelle des abeilles";
        const icon = document.createElement("img");
        icon.src = "strength.png";
        icon.classList.add("upgrade-icon");
        upgrade.appendChild(icon);
        const content = document.createElement("div");
        content.classList.add("upgrade-content");
        content.appendChild(title);
        content.appendChild(description);
        upgrade.appendChild(content);
        upgrade.addEventListener("click", () => {
            if (!this.game_.canAfford(cost))
                return;
            this.game_.spendHoney(cost);
            this.strengthCount_++;
            cost += cost;
            title.innerHTML = `Force (x${this.strengthCount_}) - ${cost} <img src="honey.png" class="cost-icon">`;
            if (this.strengthCount_ == 10) {
                title.innerHTML = `Force (x${this.strengthCount_}) - MAX`;
                upgrade.style.pointerEvents = "none";
            }
            this.game_.setBeeStrength();
        });
        this.element_.appendChild(upgrade);
    }
    addSpeedUpgrade() {
        let cost = 500;
        const upgrade = document.createElement("div");
        upgrade.classList.add("upgrade");
        const title = document.createElement("div");
        title.innerHTML = `Vitesse - ${cost} <img src="honey.png" class="cost-icon">`;
        title.classList.add("upgrade-name");
        const description = document.createElement("div");
        description.classList.add("upgrade-desc");
        description.textContent = "Double la vitesse des abeilles";
        const icon = document.createElement("img");
        icon.src = "speed.png";
        icon.classList.add("upgrade-icon");
        upgrade.appendChild(icon);
        const content = document.createElement("div");
        content.classList.add("upgrade-content");
        content.appendChild(title);
        content.appendChild(description);
        upgrade.appendChild(content);
        upgrade.addEventListener("click", () => {
            if (!this.game_.canAfford(cost))
                return;
            this.game_.spendHoney(cost);
            this.speedCount_++;
            cost += 9500;
            title.innerHTML = `Vitesse (x${this.speedCount_}) - ${cost} <img src="honey.png" class="cost-icon">`;
            description.textContent = "Triple la vitesse des abeilles";
            if (this.speedCount_ == 1) {
                this.game_.setBeeSpeed(2);
                this.music_.src = "Week 6 - Never Miss TAKE AIM.ogg";
            }
            else if (this.speedCount_ == 2) {
                this.game_.setBeeSpeed(3);
                this.music_.src = "Week 6 - Never Miss FIRE.ogg";
                title.innerHTML = `Vitesse (x${this.speedCount_}) - MAX`;
                upgrade.style.pointerEvents = "none";
            }
        });
        this.element_.appendChild(upgrade);
    }
    addRespawnUpgrade() {
        let cost = 5000;
        const upgrade = document.createElement("div");
        upgrade.classList.add("upgrade");
        const title = document.createElement("div");
        title.innerHTML = `Capteur - ${cost} <img src="honey.png" class="cost-icon">`;
        title.classList.add("upgrade-name");
        const description = document.createElement("div");
        description.classList.add("upgrade-desc");
        description.textContent = "Réduit le temps de réapparition des abeilles";
        const icon = document.createElement("img");
        icon.src = "sensor.png";
        icon.classList.add("upgrade-icon");
        upgrade.appendChild(icon);
        const content = document.createElement("div");
        content.classList.add("upgrade-content");
        content.appendChild(title);
        content.appendChild(description);
        upgrade.appendChild(content);
        upgrade.addEventListener("click", () => {
            if (!this.game_.canAfford(cost))
                return;
            this.game_.spendHoney(cost);
            this.respawnCount++;
            cost += 95000;
            title.innerHTML = `Capteur (x${this.respawnCount}) - ${cost} <img src="honey.png" class="cost-icon">`;
            if (this.respawnCount == 1) {
                this.game_.setBeeRespawn(2000);
                this.game_.activateSensor();
            }
            else if (this.respawnCount == 2) {
                this.game_.setBeeRespawn(500);
                title.innerHTML = `Capteur (x${this.respawnCount}) - MAX`;
                upgrade.style.pointerEvents = "none";
            }
        });
        this.element_.appendChild(upgrade);
    }
    addCritUpgrade() {
        let cost = 100;
        const upgrade = document.createElement("div");
        upgrade.classList.add("upgrade");
        const title = document.createElement("div");
        title.innerHTML = `Coup critique - ${cost} <img src="honey.png" class="cost-icon">`;
        title.classList.add("upgrade-name");
        const description = document.createElement("div");
        description.classList.add("upgrade-desc");
        description.textContent = "10% de chance de faire un coup critique qui double le miel récolté";
        const icon = document.createElement("img");
        icon.src = "crit.png";
        icon.classList.add("upgrade-icon");
        upgrade.appendChild(icon);
        const content = document.createElement("div");
        content.classList.add("upgrade-content");
        content.appendChild(title);
        content.appendChild(description);
        upgrade.appendChild(content);
        upgrade.addEventListener("click", () => {
            if (!this.game_.canAfford(cost))
                return;
            this.game_.spendHoney(cost);
            this.critCount_++;
            cost += 900;
            title.innerHTML = `Coup critique (x${this.critCount_}) - ${cost} <img src="honey.png" class="cost-icon">`;
            description.textContent = "50% de chance de faire un coup critique qui double le miel récolté";
            if (this.critCount_ == 1) {
                this.game_.setCrit(2, .1);
            }
            else if (this.critCount_ == 2) {
                this.game_.setCrit(2, .5);
                title.innerHTML = `Coup critique (x${this.critCount_}) - MAX`;
                upgrade.style.pointerEvents = "none";
            }
        });
        this.element_.appendChild(upgrade);
    }
    addGoldUpgrade() {
        let cost = 1000000;
        const upgrade = document.createElement("div");
        upgrade.classList.add("upgrade");
        const title = document.createElement("div");
        title.innerHTML = `Ticket d'or - ${cost} <img src="honey.png" class="cost-icon">`;
        title.classList.add("upgrade-name");
        const description = document.createElement("div");
        description.classList.add("upgrade-desc");
        description.textContent = "Débloque un bon de réduction";
        const icon = document.createElement("img");
        icon.src = "ticket.png";
        icon.classList.add("upgrade-icon");
        upgrade.appendChild(icon);
        const content = document.createElement("div");
        content.classList.add("upgrade-content");
        content.appendChild(title);
        content.appendChild(description);
        upgrade.appendChild(content);
        upgrade.addEventListener("click", () => {
            if (!this.game_.canAfford(cost))
                return;
            this.game_.spendHoney(cost);
            this.gold_ = true;
            this.game_.displayEndScreen();
            title.innerHTML = `Ticket d'or - MAX`;
            upgrade.style.pointerEvents = "none";
        });
        this.element_.appendChild(upgrade);
    }
}
