class Honey {
  private element_: HTMLElement;
  private timeout: number;

  public constructor(x : number, y : number, power: number, color: string){
    this.element_ = document.createElement("div");
    this.element_.textContent = "+" + power;
    this.element_.style.left = `${x}px`;
    this.element_.style.top = `${y}px`;
    this.element_.style.color = color;
    this.element_.classList.add("honey");
    document.body.appendChild(this.element_);

    this.timeout = window.setTimeout(() => this.element_.style.top = `${y - 20}px`, 100);
    this.timeout = window.setTimeout(() => this.destroy(), 1000);
  }

  private destroy() {
    clearTimeout(this.timeout);
    this.element_.remove();
  }
}