import { Entity } from "../entities/entity";
import { TestScene } from "../scenes/test.scene";
import { CreateRenderService, RenderService } from "../services/render.service";

export class Game {
    private start;

    private entities: Entity[] = [];

    public constructor(
        private renderService: RenderService = CreateRenderService(),
    ) {
        this.entities = TestScene();

        requestAnimationFrame((timestamp) => {
            this.start = timestamp;

            this.frame(timestamp);
        });
    }

    private frame(step): void {
        this.Update();
        this.Draw();

        requestAnimationFrame((timestamp) => {
            this.frame(timestamp - this.start);

            this.start = timestamp;
        });
    }

    public Update(): void {
        for (const entity of this.entities) {
            entity.x = Math.random() * 1;
            entity.y = Math.random() * 1;
        }
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
