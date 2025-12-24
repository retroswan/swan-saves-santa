export interface DrawSpriteData {
    texture: HTMLImageElement,
    flipped: boolean;
    frameX: number;
    frameY: number;
    tileWidth: number;
    tileHeight: number;
}

export interface RenderService {
    Clear(): void;
    DrawSprite(x: number, y: number, data: DrawSpriteData): void;
}

let renderService: RenderService;

export function CreateRenderService(): RenderService {
    if (!renderService) {
        renderService = new CanvasRenderService();
    }

    return renderService;
}

class CanvasRenderService implements RenderService {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    public constructor() {
        this.canvas = document.getElementById('c') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');

        this.resize();

        window.addEventListener('resize', () => this.resize());
    }

    private resize(): void {
        let width, height;

        width = window.innerWidth / this.canvas.width;
        height = window.innerHeight / this.canvas.height;

        let multiplier: number = Math.min(width, height);

        if (multiplier >= 1) {
            multiplier = Math.floor(multiplier);
        }

        this.canvas.style.width = `${this.canvas.width * multiplier}px`;
        this.canvas.style.height = `${this.canvas.height * multiplier}px`;
    }

    public Clear(): void {
        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height,
        );
    }

    public DrawSprite(x: number, y:number, data: DrawSpriteData): void {
        let mult: number = 1;
        if (data.flipped) {
            this.ctx.scale(-1, 1);
            mult = -1;
        }

        this.ctx.drawImage(
            data.texture,
            1 + (data.frameX * (data.tileWidth + 1)),
            1 + (data.frameY * (data.tileHeight + 1)),
            data.tileWidth,
            data.tileHeight,
            (x * mult) - (mult < 0 ? data.tileWidth : 0),
            y,
            data.tileWidth,
            data.tileHeight,
        );

        if (data.flipped) {
            this.ctx.scale(-1, 1);
        }
    }
}
