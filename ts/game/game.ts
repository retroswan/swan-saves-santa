import { Entity } from "../entities/entity";
import { TestScene } from "../scenes/test.scene";
import { AssetsService, CreateAssetsService } from "../services/assets.service";
import { Action, CreateInputService, InputService } from "../services/input.service";
import { CreateRenderService, RenderService } from "../services/render.service";
import { Scene } from "./scene";

export class Game {
    private start;

    private entities: Entity[] = [];
    private scene: Scene = TestScene;

    public constructor(
        private assetsService: AssetsService = CreateAssetsService(),
        private inputService: InputService = CreateInputService(),
        private renderService: RenderService = CreateRenderService(),
    ) {}

    public async Init() {
        await this.assetsService.Init();

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
            entity.Draw(this.renderService);
        }
    }
}
