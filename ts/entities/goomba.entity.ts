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
    ) {
        super();
    }
}
