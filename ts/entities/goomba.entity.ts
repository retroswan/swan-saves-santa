import { AssetsService, CreateAssetsService } from "../services/assets.service";
import { Component } from "./components/component";
import { GoombaDirectorComponent } from "./components/director.component";
import { WrapComponent } from "./components/wrap.component";
import { Entity } from "./entity";

export class GoombaEntity extends Entity {
    public components: Component[] = [
        new GoombaDirectorComponent(),
        new WrapComponent(),
    ];

    public constructor(
        public x: number,
        public y: number,
        private assetsService: AssetsService = CreateAssetsService(),
    ) {
        super();

        this.renderData.texture = this.assetsService.GetTexture('sprites-16x16');
    }
}
