import { Component } from "./components/component";

export abstract class Entity {
    public abstract components: Component[];

    public x: number = 0;
    public y: number = 0;

    public Update(): void {
        for (const component of this.components) {
            component.Update(this);
        }
    }
}
