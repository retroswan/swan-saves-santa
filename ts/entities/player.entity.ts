import { Component } from "./components/component";
import { PlayerDirectorComponent } from "./components/director.component";
import { Entity } from "./entity";

export class PlayerEntity extends Entity {
    public components: Component[] = [
        new PlayerDirectorComponent(),
    ];
}
