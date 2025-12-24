(() => {
  // ts/services/render.service.ts
  function CreateRenderService() {
    return new CanvasRenderService();
  }
  var CanvasRenderService = class {
    constructor() {
      this.canvas = document.getElementById("c");
      this.ctx = this.canvas.getContext("2d");
      this.resize();
      window.addEventListener("resize", () => this.resize());
    }
    resize() {
      let width, height;
      width = window.innerWidth / this.canvas.width;
      height = window.innerHeight / this.canvas.height;
      let multiplier = Math.min(width, height);
      if (multiplier >= 1) {
        multiplier = Math.floor(multiplier);
      }
      this.canvas.style.width = `${this.canvas.width * multiplier}px`;
      this.canvas.style.height = `${this.canvas.height * multiplier}px`;
    }
    Clear() {
      this.ctx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }
    DrawSprite() {
      this.ctx.fillStyle = "#f0F";
      this.ctx.fillRect(0, 0, 32, 32);
    }
  };

  // ts/main.ts
  window.addEventListener("load", () => {
    const service = CreateRenderService();
    service.DrawSprite();
  });
})();
