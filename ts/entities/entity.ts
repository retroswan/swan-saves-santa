import { DrawSpriteData, RenderService } from "../services/render.service";
import { Component } from "./components/component";

export abstract class Entity {
    public abstract components: Component[];

    public x: number = 0;
    public y: number = 0;

    public renderData: DrawSpriteData = {
        texture: null,
        flipped: false,
        frameX: 0,
        frameY: 0,
        tileWidth: 32,
        tileHeight: 32,
    };

    public Update(): void {
        for (const component of this.components) {
            component.Update(this);
        }
    }

    public Draw(renderService: RenderService): void {
        renderService.DrawSprite(this.x, this.y, this.renderData);
    }
}
