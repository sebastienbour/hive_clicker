class Hive {
  private element_: HTMLImageElement;
  private game_: Game;
  private power_: number;

  public constructor(game: Game) {
    this.element_ = document.createElement("img");
    this.element_.src = "hive.png";
    this.element_.classList.add("hive");
    this.game_ = game;
    this.game_.getElement().appendChild(this.element_);
    this.element_.draggable = false;
    this.power_ = 1;

    this.element_.addEventListener("click", (e: MouseEvent) => {
      let power = this.power_;
      let color = "white";
      if (Math.random() < this.game_.getCritChance()) {
        power *= this.game_.getCrit();
        color = "gold";
      }
      this.game_.addHoney(e.clientX + window.scrollX - 24, e.clientY + window.scrollY - 24, power, color);
      this.element_.style.transform = "translate(-50%, -50%) scale(1.03)";
      setTimeout(() => {
        this.element_.style.transform = "translate(-50%, -50%) scale(1)";
      }, 100);
    });
  }

  public setPower(multiplier: number){
    this.power_ = 1 * multiplier;
  }

  public sensorEffect(){
    const wave = document.createElement("div");
    wave.classList.add("wave");
    this.game_.getElement().appendChild(wave);
    setTimeout(() => {
      wave.remove();
    }, 2000);
  }
}