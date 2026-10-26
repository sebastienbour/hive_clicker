class Game {
  private element_: HTMLElement;
  private score_: HTMLElement;
  private count_: number;
  private total_ : number;
  private bonus_: HTMLElement;
  private multiplier_: number;
  private hive_: Hive;
  private upgrades_: Upgrades;
  private bees_: Bee[];
  private beeRespawn_: number;
  private crit_: number;
  private critChance_: number;
  private beeSpeed_: number;
  private beeStrength_: number;
  private endScreen_: HTMLElement;
  private gold_: any;
  private code_: string;

  public constructor(game: HTMLElement) {
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

  public start(){
    this.hive_ = new Hive(this);
    this.upgrades_ = new Upgrades(this);
    this.getGold(1);
  }

  public getElement(){
    return this.element_;
  }
  public getCrit(){
    return this.crit_;
  }
  public getCritChance(){
    return this.critChance_;
  }

  public addHoney(x: number, y: number, amount: number, color: string) {
    new Honey(x, y, amount, color);
    this.updateScore(amount);
  }

  public updateScore(amount: number) {
    this.count_ += amount;
    if (amount > 0) {
      this.total_ += amount;
    }
    this.score_.textContent = this.count_.toString();
    this.updateMultiplier();
  }

  public updateMultiplier(){
    const paliers = [0, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000];
    for(let i = 0; i < paliers.length; i++){
      if(this.total_ >= paliers[i])this.multiplier_ = i + 1;
    }
    this.bonus_.textContent = `×${this.multiplier_}`;
    this.hive_.setPower(this.multiplier_);
  }

  public canAfford(cost: number){
    return this.count_ >= cost;
  }

  public spendHoney(cost: number){
    this.updateScore(-cost);
  }

  public spawnBee(){
    const bee = new Bee(this, this.beeSpeed_, this.beeRespawn_, this.beeStrength_);
    this.bees_.push(bee);
  }

  public setBeeRespawn(time: number){
    this.beeRespawn_ = time;
    this.bees_.forEach(bee => bee.setRespawn(time));
  }

  public setCrit(crit: number, chance: number){
    this.crit_ = crit;
    this.critChance_ = chance;
  }

  public setBeeSpeed(speed: number){
    this.beeSpeed_ = speed;
    this.bees_.forEach(bee => bee.setSpeed(speed));
  }

  public setBeeStrength(){
    this.beeStrength_ *= 2;
    this.bees_.forEach(bee => bee.setStrength(this.beeStrength_));
  }

  public activateSensor(){
    setInterval(() => {
      this.hive_.sensorEffect();
    }, 2000);
  }

  public displayEndScreen(){
    this.endScreen_.style.display = "flex";
  }

  private getGold(id: number){
    let request : XMLHttpRequest = new XMLHttpRequest();
    let parameters : string = "id=" + id;
    request.open("get", "http://192.168.56.107/~sae/gold/api.php?" + parameters);
    request.onreadystatechange = () => {
    if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
      this.gold_ = JSON.parse(request.responseText);
      this.getCode();
    }
    };
    request.send()
  }

  private getCode(){
    this.code_ = this.gold_.code;
    document.getElementById("code").textContent = this.code_;
  }
}