import { Entity } from "../entities/entity";
import { TestScene } from "../scenes/test.scene";
import { Action, CreateInputService, InputService } from "../services/input.service";
import { CreateRenderService, RenderService } from "../services/render.service";
import { Scene } from "./scene";

export class Game {
    private start;

    private entities: Entity[] = [];
    private scene: Scene = TestScene;

    public constructor(
        private inputService: InputService = CreateInputService(),
        private renderService: RenderService = CreateRenderService(),
    ) {
        requestAnimationFrame((timestamp) => {
            this.start = timestamp;

            this.frame(timestamp);
        });
    }

    private frame(step): void {
        if (this.scene != null) {
            this.entities = this.scene();
            this.scene = null;
        }

        this.Update();
        this.Draw();

        requestAnimationFrame((timestamp) => {
            this.frame(timestamp - this.start);

            this.start = timestamp;
        });
    }

    public Update(): void {
        for (const entity of this.entities) {
            entity.Update();
        }

        this.inputService.Update();
    }

    public Draw(): void {
        this.renderService.Clear();

        for (const entity of this.entities) {
            this.renderService.DrawSprite(
                entity.x,
                entity.y,
            );
        }
    }
}
