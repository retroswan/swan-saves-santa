import { AssetsService, CreateAssetsService } from "../services/assets.service";
import { Component } from "./components/component";
import { PlayerDirectorComponent } from "./components/director.component";
import { Entity } from "./entity";

export class PlayerEntity extends Entity {
    public components: Component[] = [
        new PlayerDirectorComponent(),
    ];

    public constructor(
        private assetsService: AssetsService = CreateAssetsService(),
    ) {
        super();

        this.renderData.texture = this.assetsService.GetTexture('sprites-16x16');
    }
}
