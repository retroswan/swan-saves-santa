import { Component } from "./components/component";
import { PlayerDirectorComponent } from "./components/director.component";

export class Entity {
    public components: Component[] = [
        new PlayerDirectorComponent(),
    ];

    public x: number = 0;
    public y: number = 0;

    public Update(): void {
        for (const component of this.components) {
            component.Update(this);
        }
    }
}
